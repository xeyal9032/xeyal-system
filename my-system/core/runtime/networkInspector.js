import { execSync } from 'child_process';
import os from 'os';
import logger from '../system/logger.js';

/**
 * Network Inspector
 * Detects active ports and maps them to PIDs/Services.
 */
class NetworkInspector {
    /**
     * Get list of active TCP listening ports.
     */
    async getActivePorts() {
        const isWindows = os.platform() === 'win32';
        const ports = [];

        try {
            if (isWindows) {
                // Command: netstat -ano | findstr LISTENING
                const output = execSync('netstat -ano', { encoding: 'utf8' });
                const lines = output.split('\n');

                for (const line of lines) {
                    if (line.includes('LISTENING')) {
                        const parts = line.trim().split(/\s+/);
                        // [Protocol, Local Address, Foreign Address, State, PID]
                        // Example Local Address: 0.0.0.0:3000 or [::]:3000
                        const localAddr = parts[1];
                        const pid = parts[parts.length - 1];
                        
                        const portMatch = localAddr.match(/:(\d+)$/);
                        if (portMatch) {
                            const port = parseInt(portMatch[1]);
                            if (!ports.find(p => p.port === port)) {
                                ports.push({ port, pid: parseInt(pid), protocol: 'TCP' });
                            }
                        }
                    }
                }
            } else {
                // Mac/Linux: lsof -iTCP -sTCP:LISTEN -P -n
                const output = execSync('lsof -iTCP -sTCP:LISTEN -P -n', { encoding: 'utf8' });
                const lines = output.split('\n').slice(1); // skip header

                for (const line of lines) {
                    const parts = line.trim().split(/\s+/);
                    if (parts.length > 8) {
                        const pid = parts[1];
                        const name = parts[8];
                        const portMatch = name.match(/:(\d+)$/);
                        if (portMatch) {
                            ports.push({ port: parseInt(portMatch[1]), pid: parseInt(pid), protocol: 'TCP' });
                        }
                    }
                }
            }
        } catch (error) {
            logger.error(`Network inspection failed: ${error.message}`);
        }

        return ports.sort((a, b) => a.port - b.port);
    }

    /**
     * Check if a specific port is in use.
     */
    async isPortBusy(port) {
        const active = await this.getActivePorts();
        return active.find(p => p.port === port);
    }
}

const networkInspector = new NetworkInspector();
export default networkInspector;
