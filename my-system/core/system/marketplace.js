import fs from 'fs-extra';
import path from 'path';
import logger from '../system/logger.js';
import chalk from 'chalk';

/**
 * Plugin Marketplace
 * Manages discovery and installation of community plugins.
 */
class Marketplace {
    constructor() {
        this.pluginsDir = path.resolve('plugins');
        this.registryUrl = 'https://raw.githubusercontent.com/xeyal/xeyal-system-plugins/main/registry.json';
        
        // Featured plugins (Fallback if registry is offline)
        this.featured = [
            {
                id: 'docker-manager',
                name: 'Docker Monitor',
                description: 'View and control Docker containers directly from the dashboard.',
                version: '1.0.0',
                author: 'Xeyal'
            },
            {
                id: 'git-lens',
                name: 'Git Lens',
                description: 'Advanced Git history and blame visualization for your projects.',
                version: '0.8.2',
                author: 'Xeyal'
            },
            {
                id: 'api-tester',
                name: 'API Tester',
                description: 'A built-in Postman alternative for testing local APIs.',
                version: '1.1.0',
                author: 'Community'
            }
        ];
    }

    /**
     * Get list of available plugins.
     */
    async getAvailablePlugins() {
        try {
            const response = await fetch(this.registryUrl).catch(() => null);
            if (response && response.ok) {
                const data = await response.json();
                return data.plugins;
            }
        } catch {
            // Silence error, use featured
        }
        return this.featured;
    }

    /**
     * Install a plugin by ID.
     */
    async installPlugin(pluginId) {
        console.log(chalk.blue(`🔌 Installing plugin: ${chalk.white(pluginId)}...`));
        
        try {
            const pluginPath = path.join(this.pluginsDir, pluginId);
            if (await fs.pathExists(pluginPath)) {
                throw new Error('Plugin already installed.');
            }

            await fs.ensureDir(pluginPath);
            
            // In a real scenario, we would download a ZIP and extract it here.
            // For this demo, we create a placeholder plugin structure.
            await fs.writeJson(path.join(pluginPath, 'manifest.json'), {
                id: pluginId,
                name: pluginId.charAt(0).toUpperCase() + pluginId.slice(1),
                version: '1.0.0',
                entry: 'index.js'
            });

            await fs.writeFile(path.join(pluginPath, 'index.js'), `
                export default {
                    init: (system) => {
                        console.log('Plugin ${pluginId} loaded!');
                    }
                }
            `);

            console.log(chalk.green(`✅ Plugin "${pluginId}" installed successfully.`));
            logger.info(`Plugin ${pluginId} installed.`);
            return true;
        } catch (error) {
            console.error(chalk.red(`❌ Failed to install plugin:`), error.message);
            logger.error(`Plugin install error: ${error.stack}`);
            return false;
        }
    }
}

const marketplace = new Marketplace();
export default marketplace;
