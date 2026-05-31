import inquirer from 'inquirer';
import fs from 'fs-extra';
import chalk from 'chalk';
import logger from '../core/system/logger.js';
import path from 'path';

/**
 * Command: init
 * Initializes the project with configuration and .env files.
 */
export const initCommand = async () => {
  const configExists = await fs.pathExists('config/default.json');
  const envExists = await fs.pathExists('.env');

  if (configExists || envExists) {
      console.log(chalk.yellow('\n⚠️  System already initialized in this directory.'));
      const { overwrite } = await inquirer.prompt([
          {
              type: 'confirm',
              name: 'overwrite',
              message: 'Do you want to re-initialize and OVERWRITE existing settings?',
              default: false
          }
      ]);
      if (!overwrite) {
          console.log(chalk.blue('Initialization aborted. Settings preserved.\n'));
          return;
      }
  }

  console.log(chalk.blue.bold('\n🚀 Initializing project setup...\n'));
  // ... rest of the logic remains same but improved ...
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter your project name:',
        default: path.basename(process.cwd())
      },
      {
        type: 'list',
        name: 'logLevel',
        message: 'Select default log level:',
        choices: ['info', 'warn', 'error'],
        default: 'info'
      },
      {
        type: 'confirm',
        name: 'autoLint',
        message: 'Enable auto-linting on start?',
        default: true
      }
    ]);

    // Create config directory if not exists
    await fs.ensureDir('config');

    // Create default.json
    const config = {
      name: answers.projectName,
      logLevel: answers.logLevel,
      autoLint: answers.autoLint,
      version: '1.2.0',
      safeMode: true // New default for productivity/safety
    };
    await fs.writeJson('config/default.json', config, { spaces: 2 });
    console.log(chalk.green('✅ config/default.json updated.'));

    // Create .env
    const envContent = `LOG_LEVEL=${answers.logLevel}\nDEBUG=true\nDASHBOARD_PORT=3000\nSAFE_MODE=true\n`;
    await fs.writeFile('.env', envContent);
    console.log(chalk.green('✅ .env updated.'));

    // Generate basic ESLint config if not exists
    const eslintPath = '.eslintrc.json';
    if (!await fs.pathExists(eslintPath)) {
        const eslintConfig = {
          "env": { "node": true, "es2021": true },
          "extends": "eslint:recommended",
          "parserOptions": { "ecmaVersion": "latest", "sourceType": "module" },
          "rules": {}
        };
        await fs.writeJson(eslintPath, eslintConfig, { spaces: 2 });
        console.log(chalk.green('✅ .eslintrc.json created.'));
    }

    console.log(chalk.blue.bold('\n✨ Project initialized successfully!\n'));
    logger.info(`Project initialized: ${answers.projectName}`);
  } catch (error) {
    console.error(chalk.red('\n❌ Initialization failed:'), error.message);
    logger.error(`Initialization failed: ${error.message}`);
  }
};

export default initCommand;
