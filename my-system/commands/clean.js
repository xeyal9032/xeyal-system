import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import logger from '../core/system/logger.js';
import { getActiveProject } from '../core/system/projectManager.js';

/**
 * Command: clean
 * Perforns deep cleanup of node_modules, logs, and cache.
 */
export const cleanCommand = async () => {
    const active = await getActiveProject();
    const targetPath = active ? active.path : '.';
    const targetName = active ? active.name : 'current directory';

    console.log(chalk.blue.bold(`\n🧹 Cleanup Utility: ${targetName}\n`));

    const choices = [
        { name: 'node_modules (Deep Clean)', value: 'node_modules', checked: true },
        { name: 'System Logs (logs/*)', value: 'logs', checked: true },
        { name: 'NPM Cache (npm cache clean)', value: 'cache', checked: false }
    ];

    const { targets } = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'targets',
            message: 'Select items to clean:',
            choices
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: chalk.red.bold('Are you sure? This action is irreversible.'),
            default: false,
            when: (ans) => ans.targets.length > 0
        }
    ]);

    if (!targets || targets.length === 0 || !confirm) {
        console.log(chalk.gray('\n  Cleanup cancelled.'));
        return;
    }

    try {
        if (targets.includes('node_modules')) {
            process.stdout.write(chalk.white('  Cleaning node_modules... '));
            await fs.remove(`${targetPath}/node_modules`);
            console.log(chalk.green('DONE'));
        }

        if (targets.includes('logs')) {
            process.stdout.write(chalk.white('  Cleaning logs... '));
            await fs.emptyDir(`${targetPath}/logs`);
            console.log(chalk.green('DONE'));
        }

        console.log(chalk.green.bold(`\n✅ ${targetName} is now clean as a whistle!\n`));
        logger.info(`Cleanup performed on ${targetName}: ${targets.join(', ')}`);
    } catch (error) {
        console.error(chalk.red('\n❌ Cleanup failed:'), error.message);
        logger.error(`Cleanup failure: ${error.stack}`);
    }
};

export default cleanCommand;
