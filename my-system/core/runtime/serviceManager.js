import { spawn } from 'child_process';
import chalk from 'chalk';
import logger from '../system/logger.js';
import bus from '../system/events.js';
import state from '../system/state.js';
import traceManager from '../system/traceManager.js';
import portManager from './portManager.js';
import errorAnalyzer from '../intelligence/errorAnalyzer.js';
import autoFix from './autoFix.js';
import profiles from '../config/profiles.js';
import net from 'net';

/**
 * Service Manager (The Heart of Autonomous OS)
 * Handles full lifecycle, health monitoring, and recovery.
 */
class ServiceManager {
    constructor() {
        this.services = new Map();
    }

    async startService(serviceConfig, force = false) {
        const { name, cmd, port, restart = true } = serviceConfig;

        const traceId = traceManager.startTrace('START_SERVICE', { name, port, force });

        // 1. Initial State
        state.updateServiceStatus(name, 'STARTING', { port });
        traceManager.addStep(traceId, 'INITIAL_STATE_SET');

        // 2. Port Conflict Logic
        if (port && !force) {
            traceManager.addStep(traceId, 'CHECK_PORT');
            const pid = await portManager.getProcessOnPort(port);
            if (pid) {
                traceManager.endTrace(traceId, 'PORT_CONFLICT');
                state.updateServiceStatus(name, 'PORT_CONFLICT', { port, pid });
                bus.broadcast('SERVICE_PORT_CONFLICT', 'RUNTIME', { name, port, pid });
                return;
            }
        }

        // 3. Spawn Process
        traceManager.addStep(traceId, 'SPAWN_PROCESS', { cmd });
        const { cwd } = serviceConfig;
        const [command, ...args] = cmd.split(' ');
        const child = spawn(command, args, { shell: true, stdio: 'pipe', cwd: cwd || '.' });

        const serviceRecord = {
            config: serviceConfig,
            process: child,
            status: 'RUNNING',
            startTime: Date.now(),
            restartCount: 0,
            lastRestart: null
        };

        this.services.set(name, serviceRecord);
        state.updateServiceStatus(name, 'RUNNING', { pid: child.pid });

        // 4. Input/Output Handling
        child.stdout.on('data', (data) => {
            const line = data.toString().trim();
            if (line) logger.info(`[${name}] ${line}`, { category: 'SERVICE' });
        });

        child.stderr.on('data', (data) => {
            const line = data.toString().trim();
            if (!line) return;
            logger.error(`[${name}] ${line}`, { category: 'SERVICE' });

            const profile = profiles.getProfile();
            const analysis = errorAnalyzer.analyze(line, profile);
            if (analysis && analysis.isSafe && !serviceRecord.isFixing) {
                if (analysis.confidence >= profile.autoFixThreshold) {
                    serviceRecord.isFixing = true;
                    this.executeAutoFix(name, analysis, serviceRecord);
                } else {
                    logger.warn(`[${name}] Auto-Fix blocked by Profile Threshold. Confidence: ${(analysis.confidence * 100).toFixed(0)}%, Required: ${(profile.autoFixThreshold * 100).toFixed(0)}%`, { category: 'AUTOFIX' });
                    // Instead of fixing, emit event for ask user
                    bus.broadcast('AUTONOMOUS_FIX_BLOCKED', 'RUNTIME', { name, type: analysis.type, confidence: analysis.confidence });
                }
            }
        });

        // 5. Lifecycle Monitoring
        child.on('exit', (code) => {
            this.handleExit(name, code);
        });

        // 6. Active Health Check
        if (port) this.monitorHealth(name, port);

        traceManager.endTrace(traceId, 'SUCCESS');
        return child;
    }

    async handleExit(name, code) {
        const record = this.services.get(name);
        if (!record) return;

        record.status = code === 0 ? 'STOPPED' : 'CRASHED';
        state.updateServiceStatus(name, record.status, { exitCode: code });

        if (record.config.restart && code !== 0) {
            this.attemptRecovery(name);
        }
    }

    async attemptRecovery(name) {
        const record = this.services.get(name);
        if (!record) return;

        record.restartCount++;
        
        let delayMultiplier = 1;
        const metrics = state.get('metrics');
        // If system CPU is under pressure (>80%), throttle restarts drastically
        if (metrics && metrics.cpu > 80) {
            delayMultiplier = 5;
            logger.warn(`Governor Active: High CPU (${metrics.cpu}%). Throttling recovery for ${name}`, { category: 'GOVERNOR' });
        }

        const delay = Math.min(1000 * Math.pow(2, record.restartCount) * delayMultiplier, 60000); 

        logger.warn(`Service ${name} crashed. Recovery attempt ${record.restartCount}/2 in ${delay}ms...`, { category: 'RUNTIME' });
        bus.broadcast('SERVICE_RECOVERY_START', 'RUNTIME', { name, attempt: record.restartCount, delay });

        setTimeout(() => {
            if (state.get('safeMode')) {
                logger.error(`System in SAFE_MODE. Recovery for ${name} aborted for stability.`, { category: 'SYSTEM' });
                return;
            }
            this.startService(record.config, true);
        }, delay);

        if (record.restartCount >= 2) {
            logger.error(`Service ${name} failed after 2 attempts. Activating SAFE_MODE.`, { category: 'CRITICAL' });
            state.incrementCrash(); // This will trigger safeMode in state.js
            bus.broadcast('SERVICE_MAX_RETRIES', 'CRITICAL', { name });
        }
    }

    async executeAutoFix(name, analysis, record) {
        logger.info(`[${name}] Initiating Auto-Fix for ${analysis.type}`, { category: 'AUTOFIX' });
        bus.broadcast('AUTONOMOUS_FIX_INITIATED', 'RUNTIME', { name, type: analysis.type });

        try {
            let success = false;
            if (global.SIMULATION_MODE) {
                logger.info(`[SIMULATION] Would have executed ${analysis.actionCode}`, { category: 'AUTOFIX' });
                success = true;
            } else {
                if (analysis.actionCode === 'ACTION_KILL_PORT') {
                    success = await autoFix.killProcessOnPort(analysis.data.port);
                } else if (analysis.actionCode === 'ACTION_INSTALL_DEP') {
                    success = autoFix.installDependency(record.config.cwd || '.'); 
                }
            }

            if (success) {
                logger.info(`[${name}] Auto-Fix successful. Restarting service.`, { category: 'AUTOFIX' });
                bus.broadcast('AUTONOMOUS_FIX_SUCCESS', 'RUNTIME', { name, type: analysis.type });
                
                // Track Internal Metrics (Saved ~3 mins per fix)
                state.recordMetric('totalFixes', 1);
                state.recordMetric('timeSavedMs', 3 * 60 * 1000); 

                // Reset restart count so we don't backoff after a fix
                record.restartCount = 0;
                
                // the service will exit soon if it hasn't, force kill just in case
                if (record.process) record.process.kill();
            } else {
                logger.error(`[${name}] Auto-Fix failed. Falling back to normal recovery.`, { category: 'AUTOFIX' });
            }
        } catch (err) {
            logger.error(`[${name}] Auto-Fix error: ${err.message}`, { category: 'AUTOFIX' });
        } finally {
            // Unset fixing flag so it doesn't get flooded
            setTimeout(() => { record.isFixing = false; }, 2000);
        }
    }

    monitorHealth(name, port) {
        const check = () => {
            const record = this.services.get(name);
            if (!record || record.status !== 'RUNNING') return;

            const client = new net.Socket();
            client.setTimeout(2000);
            
            client.connect(port, '127.0.0.1', () => {
                client.destroy();
                // If it was unhealthy before, mark it healthy
                if (record.isUnhealthy) {
                    record.isUnhealthy = false;
                    state.updateServiceStatus(name, 'RUNNING', { health: 'OK' });
                }
            });

            client.on('error', () => {
                if (!record.isUnhealthy) {
                    record.isUnhealthy = true;
                    state.updateServiceStatus(name, 'UNHEALTHY', { health: 'FAILED' });
                    bus.broadcast('SERVICE_UNHEALTHY', 'RUNTIME', { name, port });
                }
                client.destroy();
            });

            client.on('timeout', () => {
                client.destroy();
            });
        };

        // Poll health every 10 seconds
        const interval = setInterval(check, 10000);
        this.services.get(name).healthInterval = interval;
    }

    stopService(name) {
        const record = this.services.get(name);
        if (record) {
            if (record.healthInterval) clearInterval(record.healthInterval);
            
            // Clean process killing on Windows (kill entire tree)
            if (process.platform === 'win32') {
                try {
                    spawn('taskkill', ['/F', '/T', '/PID', record.process.pid]);
                } catch (e) {
                    record.process.kill();
                }
            } else {
                record.process.kill();
            }

            this.services.delete(name);
            state.updateServiceStatus(name, 'STOPPED');
            logger.info(`Service ${name} manually stopped.`, { category: 'RUNTIME' });
        }
    }

    stopAll() {
        logger.info('Stopping all managed services...', { category: 'RUNTIME' });
        for (const name of Array.from(this.services.keys())) {
            this.stopService(name);
        }
    }
}

const serviceManager = new ServiceManager();
export default serviceManager;
