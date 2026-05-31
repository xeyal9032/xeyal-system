import logger from './logger.js';

/**
 * Permissions System
 * Managed list of allowed actions for the system and plugins.
 */
class PermissionsManager {
    constructor() {
        this.scopes = {
            SYSTEM: ['READ', 'WRITE', 'EXECUTE', 'NETWORK', 'ADMIN'],
            PLUGIN: ['READ', 'LOG'], // Default restricted scope for plugins
            USER: ['READ', 'WRITE', 'EXECUTE']
        };

        // Command denylist for non-admin execution
        this.dangerousCommands = [
            'rm -rf',
            'format',
            'mkfs',
            ':(){ :|:& };:', // Fork bomb
            '> /dev/',
            'chmod 777'
        ];
    }

    /**
     * Check if a specific scope has permission for an action.
     */
    can(scope, action) {
        const allowed = this.scopes[scope] || [];
        const isAllowed = allowed.includes(action) || allowed.includes('ADMIN');
        
        if (!isAllowed) {
            logger.warn(`Permission Denied: Scope [${scope}] attempted unauthorized action [${action}]`, { category: 'SECURITY' });
        }
        
        return isAllowed;
    }

    /**
     * Verify if a command string is safe to execute.
     */
    isCommandSafe(cmd) {
        const lowerCmd = cmd.toLowerCase();
        for (const dangerous of this.dangerousCommands) {
            if (lowerCmd.includes(dangerous)) {
                logger.error(`Security Block: Dangerous command pattern detected! [${cmd}]`, { category: 'SECURITY' });
                return false;
            }
        }
        return true;
    }
    
    /**
     * Grant temporary permission to a scope (Runtime only)
     */
    grant(scope, action) {
        if (!this.scopes[scope]) this.scopes[scope] = [];
        if (!this.scopes[scope].includes(action)) {
            this.scopes[scope].push(action);
            logger.info(`Permission Granted: Scope [${scope}] now has [${action}]`, { category: 'SECURITY' });
        }
    }
}

const permissions = new PermissionsManager();
export default permissions;
