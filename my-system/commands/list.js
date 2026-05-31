import chalk from 'chalk';
import { getProjects } from '../core/system/projectManager.js';

/**
 * Command: list
 * Lists all projects managed by my-system.
 */
export const listCommand = async () => {
    console.log(chalk.blue.bold('\n📁 Managed Projects:\n'));

    try {
        const { active, projects } = await getProjects();

        if (projects.length === 0) {
            console.log(chalk.gray('  No projects added yet. Use "my-system open <path>" to add one.'));
            return;
        }

        projects.forEach(p => {
            const isActive = p.name === active;
            const prefix = isActive ? chalk.green(' → ') : '   ';
            const name = isActive ? chalk.green.bold(p.name) : chalk.white(p.name);
            
            console.log(`${prefix}${name.padEnd(25)} ${chalk.gray(p.path)}`);
        });

        console.log('\n' + chalk.gray(`Total: ${projects.length} | Active: ${active || 'none'}\n`));
    } catch (error) {
        console.error(chalk.red('❌ Failed to list projects:'), error.message);
    }
};

export default listCommand;
