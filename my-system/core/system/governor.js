import si from 'systeminformation';
import bus from './events.js';
import state from './state.js';
import logger from './logger.js';

/**
 * Resource Governor
 * Watches system health and enforces limits.
 */
class ResourceGovernor {
    constructor() {
        this.thresholds = {
            cpu: 85,    // %
            memory: 90  // %
        };
        this.interval = null;
    }

    start(intervalMs = 5000) {
        if (this.interval) clearInterval(this.interval);
        
        this.interval = setInterval(async () => {
            await this.checkResources();
        }, intervalMs);

        logger.info(`Resource Governor active (Interval: ${intervalMs}ms)`, { category: 'SYSTEM' });
    }

    async checkResources() {
        try {
            const cpu = await si.currentLoad();
            const mem = await si.mem();

            const cpuLoad = Math.round(cpu.currentLoad);
            const memUsage = Math.round((mem.active / mem.total) * 100);

            // Update State
            state.set('metrics', {
                cpu: cpuLoad,
                memory: memUsage,
                timestamp: new Date().toISOString()
            });

            // Threshold Checks
            if (cpuLoad > this.thresholds.cpu) {
                this.handleHighResource('CPU', cpuLoad);
            }

            if (memUsage > this.thresholds.memory) {
                this.handleHighResource('MEMORY', memUsage);
            }

            // Sync with Dashboard
            bus.broadcast('RESOURCE_METRICS', 'MONITOR', { cpu: cpuLoad, memory: memUsage });

        } catch (error) {
            logger.error(`Governor check failed: ${error.message}`);
        }
    }

    handleHighResource(type, value) {
        logger.warn(`HIGH ${type} LOAD DETECTED: ${value}%`, { category: 'SYSTEM' });
        bus.broadcast('SYSTEM_PRESSURE', 'CRITICAL', { type, value });

        // Potential autonomous action: if RAM is critical, we might alert or throttle
        if (type === 'MEMORY' && value > 95) {
            bus.broadcast('SYSTEM_MEM_CRITICAL', 'CRITICAL', { value });
            // In a real OS, we'd kill non-essential processes here
        }
    }

    stop() {
        if (this.interval) clearInterval(this.interval);
    }
}

const governor = new ResourceGovernor();
export default governor;
