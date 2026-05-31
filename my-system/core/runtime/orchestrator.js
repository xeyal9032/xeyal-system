import { spawn } from 'child_process';
import chalk from 'chalk';
import logger from '../system/logger.js';
import fs from 'fs-extra';
import path from 'path';
import portManager from './portManager.js';

/**
 * Task Orchestrator
 * Manages multiple concurrent processes with recovery logic.
 */
class TaskOrchestrator {
    constructor() {
        this.processes = new Map();
        this.io = null; // Will be set by dashboard
    }

    setIO(io) {
        this.io = io;
    }

    async runStack(category, stackName) {
        const config = await fs.readJson('config/stacks.json');
        const stack = config.CATEGORIES[category]?.[stackName];

        if (!stack) {
            throw new Error(`Stack "${stackName}" not found in category "${category}"`);
        }

        console.log(chalk.blue.bold(`\n🎼 Orchestrating Stack: ${category} / ${stackName}\n`));
        logger.info(`Orchestrating stack: ${category}/${stackName}`, { category: 'WORKFLOW' });

        for (const service of stack) {
            this.startService(service);
        }
    }

    async startService(service, force = false, socket = null) {
        // Check port if defined
        if (service.port && !force) {
            const pid = await portManager.getProcessOnPort(service.port);
            if (pid) {
                logger.warn(`Port conflict on ${service.port} (PID: ${pid})`);
                if (socket) {
                    socket.emit('port_conflict', { port: service.port, pid, service });
                }
                return;
            }
        }
        
        console.log(chalk.gray(`  - Starting ${chalk.white.bold(service.name)}...`));
        
        const [cmd, ...args] = service.cmd.split(' ');
        const child = spawn(cmd, args, { shell: true, stdio: 'pipe' });

        child.stdout.on('data', (data) => {
            logger.info(`[${service.name}] ${data.toString().trim()}`, { category: 'WORKFLOW' });
        });

        child.stderr.on('data', (data) => {
            logger.error(`[${service.name}] ${data.toString().trim()}`, { category: 'WORKFLOW' });
        });

        child.on('exit', (code) => {
            logger.warn(`Service ${service.name} exited with code ${code}`, { category: 'WORKFLOW' });
            if (service.restart && code !== 0) {
                console.log(chalk.yellow(`  ⚠️  ${service.name} crashed. Restarting...`));
                setTimeout(() => this.startService(service), 2000);
            }
        });

        this.processes.set(service.name, child);
    }

    stopAll() {
        for (const [name, child] of this.processes) {
            child.kill();
            logger.info(`Service ${name} stopped.`, { category: 'WORKFLOW' });
        }
        this.processes.clear();
    }
}

const orchestrator = new TaskOrchestrator();
export default orchestrator;
