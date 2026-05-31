import si from 'systeminformation';
import logger from './logger.js';
import chalk from 'chalk';

/**
 * System Status Core
 * Provides live hardware and network performance data.
 */
export const getFullStatus = async () => {
    try {
        const [cpu, mem, disk, net] = await Promise.all([
            si.currentLoad(),
            si.mem(),
            si.fsSize(),
            si.networkConnections()
        ]);

        return {
            cpu: {
                load: Math.round(cpu.currentLoad),
                cores: cpu.cpus.length
            },
            memory: {
                total: (mem.total / 1024 / 1024 / 1024).toFixed(2),
                used: (mem.active / 1024 / 1024 / 1024).toFixed(2),
                percentage: Math.round((mem.active / mem.total) * 100)
            },
            disk: {
                size: (disk[0].size / 1024 / 1024 / 1024).toFixed(2),
                used: (disk[0].used / 1024 / 1024 / 1024).toFixed(2),
                percentage: disk[0].use
            },
            ports: net
                .filter(c => c.state === 'LISTEN')
                .map(c => ({
                    port: c.localPort,
                    process: c.process,
                    pid: c.pid
                }))
                .filter((v, i, a) => a.findIndex(t => t.port === v.port) === i) // Unique ports
        };
    } catch (error) {
        logger.error(`Failed to fetch system status: ${error.message}`);
        throw error;
    }
};

/**
 * Check if a specific port is in use and return occupant info
 */
export const findProcessByPort = async (port) => {
    const status = await getFullStatus();
    return status.ports.find(p => parseInt(p.port) === parseInt(port));
};

export default {
    getFullStatus,
    findProcessByPort
};
