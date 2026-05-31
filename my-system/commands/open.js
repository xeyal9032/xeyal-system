import chalk from 'chalk';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs-extra';
import { addProject, switchProject, getProjects } from '../core/system/projectManager.js';
import logger from '../core/system/logger.js';

/**
 * Command: open
 * Opens a project in VS Code and adds it to the project list if new.
 */
export const openCommand = async (targetPath = '.') => {
    const absolutePath = path.resolve(targetPath);
    const projectName = path.basename(absolutePath);

    console.log(chalk.blue.bold(`\n📂 Opening project: ${projectName}...\n`));

    try {
        if (!await fs.pathExists(absolutePath)) {
            throw new Error(`Path does not exist: ${absolutePath}`);
        }

        // 1. Add/Register project if not already tracked
        const { projects } = await getProjects();
        if (!projects.find(p => p.path === absolutePath)) {
            await addProject(projectName, absolutePath);
            console.log(chalk.gray(`  - Registered new project: ${projectName}`));
        }

        // 2. Set as active
        await switchProject(projectName);

        // 3. Open in VS Code
        console.log(chalk.gray(`  - Launching VS Code...`));
        try {
            execSync('code .', { cwd: absolutePath, stdio: 'inherit' });
        } catch (err) {
            console.warn(chalk.yellow('  ⚠️  Could not launch VS Code automatically. (Ensure "code" is in your PATH)'));
        }

        console.log(chalk.green.bold(`\n✅ Ready to work on ${projectName}!\n`));
        logger.info(`Opened project ${projectName} in editor.`);
    } catch (error) {
        console.error(chalk.red('\n❌ Open failed:'), error.message);
        logger.error(`Open command failed: ${error.stack}`);
    }
};

export default openCommand;
