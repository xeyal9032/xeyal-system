import chalk from 'chalk';
import path from 'path';
import inquirer from 'inquirer';
import templateManager from '../core/runtime/templateManager.js';
import logger from '../core/system/logger.js';

/**
 * Command: create
 * Interactive project scaffolding.
 */
export const createCommand = async (projectName, options = {}) => {
    let name = projectName;
    let selectedTemplateId = options.template;

    if (!name && options.nonInteractive) {
        throw new Error('Project name is required for non-interactive mode.');
    }

    if (!name) {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter your project name:',
                validate: (input) => input.length > 0 ? true : 'Project name cannot be empty.'
            }
        ]);
        name = answers.name;
    }

    if (!selectedTemplateId && !options.nonInteractive) {
        const templates = templateManager.getTemplates();
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'templateId',
                message: 'Select a project template:',
                choices: templates.map(t => ({ name: `${t.name} - ${t.description}`, value: t.id }))
            }
        ]);
        selectedTemplateId = answers.templateId;
    }

    if (!selectedTemplateId) {
        selectedTemplateId = 'node-express'; // default fallback for non-interactive if not specified
    }

    const targetPath = path.join(process.cwd(), name);

    console.log(chalk.blue(`\n🚀 Creating project "${chalk.white(name)}" in ${chalk.white(targetPath)}...`));

    try {
        const success = await templateManager.bootstrap(selectedTemplateId, targetPath);
        if (success) {
            if (options.nonInteractive) {
                console.log(`XEYAL_JSON_DATA_START{"path": "${targetPath.replace(/\\/g, '/')}"}XEYAL_JSON_DATA_END`);
            }
            console.log(chalk.green.bold(`\n✨ Project "${name}" is ready!`));
            console.log(chalk.white(`   cd ${name}`));
            console.log(chalk.white(`   xeyal-system add .`));
            console.log(chalk.white(`   xeyal-system dev\n`));
        }
    } catch (error) {
        console.error(chalk.red(`\n❌ Error creating project:`), error.message);
        logger.error(`Create command failed: ${error.stack}`);
    }
};

export default createCommand;
