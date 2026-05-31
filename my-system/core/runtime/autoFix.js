import { execSync } from 'child_process';
import { findProcessByPort } from '../system/systemStatus.js';
import logger from '../system/logger.js';
import packageManager from './packageManager.js';
import chalk from 'chalk';

/**
 * Auto-Fix Core
 * Implements logic for resolving system conflicts.
 */
export const killProcessOnPort = async (port) => {
    const occupant = await findProcessByPort(port);
    if (!occupant) return false;

    try {
        logger.info(`Attempting to kill process ${occupant.pid} on port ${port} (${occupant.process})`);
        
        const cmd = process.platform === 'win32' 
            ? `taskkill /F /PID ${occupant.pid}` 
            : `kill -9 ${occupant.pid}`;
            
        execSync(cmd, { stdio: 'pipe' });
        return true;
    } catch (error) {
        logger.error(`Failed to kill process on port ${port}: ${error.message}`);
        throw error;
    }
};

/**
 * Automated Dependency Verification
 */
export const verifyNodeModules = (projectPath = '.') => {
    try {
        execSync('npm list --depth=0', { cwd: projectPath, stdio: 'pipe' });
        return true;
    } catch (error) {
        // Returns false if there are missing dependencies
        return false;
    }
};

/**
 * Automatically install dependencies
 */
export const installDependency = (projectPath = '.') => {
    logger.info(`AutoFix: Initiating dependency installation at ${projectPath}`, { category: 'AUTOFIX' });
    try {
        packageManager.installDependencies(projectPath);
        return true;
    } catch (error) {
        logger.error(`AutoFix: Failed to install dependencies: ${error.message}`);
        return false;
    }
};

export default {
    killProcessOnPort,
    verifyNodeModules,
    installDependency
};
