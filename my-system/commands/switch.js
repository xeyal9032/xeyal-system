import inquirer from 'inquirer';
import chalk from 'chalk';
import { getProjects, switchProject } from '../core/system/projectManager.js';

/**
 * Command: switch
 * Interactively select the active project context.
 */
export const switchCommand = async (projectName) => {
    try {
        const { projects, active } = await getProjects();

        if (projects.length === 0) {
            console.log(chalk.yellow('\n⚠️  No projects found to switch.'));
            return;
        }

        let target = projectName;

        if (!target) {
            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'selected',
                    message: 'Select project to switch to:',
                    choices: projects.map(p => ({
                        name: `${p.name} ${chalk.gray(p.path)}`,
                        value: p.name
                    })),
                    default: active
                }
            ]);
            target = answers.selected;
        }

        await switchProject(target);
        console.log(chalk.green(`\n✅ Active project set to: ${chalk.bold(target)}\n`));
    } catch (error) {
        console.error(chalk.red('\n❌ Switch failed:'), error.message);
    }
};

export default switchCommand;
