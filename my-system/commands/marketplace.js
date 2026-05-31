import chalk from 'chalk';
import marketplace from '../core/system/marketplace.js';

/**
 * Command: marketplace
 * Discovery and installation of system plugins.
 */
export const marketplaceCommand = async (action, id, options = {}) => {
    const isJson = options.json || process.argv.includes('--json');

    try {
        if (action === 'list') {
            const plugins = await marketplace.getAvailablePlugins();
            if (isJson) {
                console.log(`XEYAL_JSON_DATA_START${JSON.stringify(plugins)}XEYAL_JSON_DATA_END`);
                return;
            }

            console.log(chalk.blue.bold('\n🔌 Plugin Marketplace:\n'));
            plugins.forEach(p => {
                console.log(`  ${chalk.white.bold(p.name.padEnd(20))} | v${p.version} | by ${p.author}`);
                console.log(chalk.gray(`  ${p.description}\n`));
            });
        } 
        else if (action === 'install') {
            if (!id) {
                if (!isJson) console.error(chalk.red('❌ Please specify a plugin ID to install.'));
                process.exit(1);
            }
            await marketplace.installPlugin(id);
        }
        else {
            if (!isJson) console.log(chalk.yellow('Usage: xeyal-system marketplace <list|install> [id]'));
        }
    } catch (error) {
        if (isJson) {
            console.log('XEYAL_JSON_DATA_START[]XEYAL_JSON_DATA_END');
        } else {
            console.error(chalk.red('❌ Marketplace error:'), error.message);
        }
    }
};

export default marketplaceCommand;
