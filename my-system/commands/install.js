import chalk from 'chalk';
import logger from '../core/system/logger.js';
import { installDependencies, validatePackageJson } from '../core/runtime/packageManager.js';

/**
 * Command: install
 * Validates package.json and installs dependencies.
 */
export const installCommand = async () => {
  console.log(chalk.blue.bold('\n📦 Preparing to install dependencies...\n'));

  try {
    const project = await detectProjectType('.');
    
    if (project?.type === 'node') {
        await validatePackageJson('.');
    }
    
    // Perform installation
    await installDependencies('.');

    console.log(chalk.green.bold('\n✅ Installation process completed.\n'));
    logger.info('Installation command executed successfully.');
  } catch (error) {
    console.error(chalk.red('\n❌ Installation failed:'), error.message);
    logger.error(`Install command failed: ${error.message}`);
  }
};

export default installCommand;
