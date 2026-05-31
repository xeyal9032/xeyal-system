import { execSync } from 'child_process';
import logger from '../system/logger.js';

class PortManager {
    async getProcessOnPort(port) {
        try {
            const isWin = process.platform === 'win32';
            let cmd;
            
            if (isWin) {
                cmd = `netstat -ano | findstr :${port}`;
            } else {
                cmd = `lsof -i tcp:${port} | grep LISTEN | awk '{print $2}'`;
            }

            const output = execSync(cmd).toString().trim();
            if (!output) return null;

            if (isWin) {
                const lines = output.split('\n');
                const parts = lines[0].trim().split(/\s+/);
                return parts[parts.length - 1]; // PID is the last column
            } else {
                return output.split('\n')[0]; // First PID found
            }
        } catch (error) {
            return null;
        }
    }

    async killProcess(pid) {
        try {
            if (process.platform === 'win32') {
                execSync(`taskkill /F /PID ${pid}`);
            } else {
                execSync(`kill -9 ${pid}`);
            }
            logger.info(`Killed process ${pid} for environment stability.`);
            return true;
        } catch (error) {
            logger.error(`Failed to kill process ${pid}: ${error.message}`);
            return false;
        }
    }
}

const portManager = new PortManager();
export default portManager;
