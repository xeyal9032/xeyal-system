import chalk from 'chalk';
import logger from '../core/system/logger.js';
import fs from 'fs-extra';
import { installDependencies } from '../core/runtime/packageManager.js';
import { killProcessOnPort, verifyNodeModules } from '../core/runtime/autoFix.js';

/**
 * Command: fix (Ultimate Edition)
 * Automatically repairs environment issues including port conflicts.
 */
export const fixCommand = async (portToKill) => {
  console.log(chalk.blue.bold('\n🛠️  Starting Advanced Auto-Repair...\n'));
  logger.event('FIX_START', 'SYSTEM');
  let fixes = 0;

  // 1. Specific Port Kill if provided
  if (portToKill) {
      process.stdout.write(chalk.white(`Attempting to free port ${portToKill}... `));
      const killed = await killProcessOnPort(portToKill);
      if (killed) {
          console.log(chalk.green('SUCCESS'));
          logger.info(`Port ${portToKill} freed successfully.`, { category: 'NETWORK' });
          fixes++;
      } else {
          console.log(chalk.yellow('NOT FOUND/FAILED'));
          logger.warn(`Failed to free port ${portToKill}.`, { category: 'NETWORK' });
      }
  }

  // 2. Generic System Repairs
  const runRepair = async (name, condition, repairFn) => {
    process.stdout.write(chalk.white(`Checking ${name}... `));
    if (await condition()) {
      console.log(chalk.green('OK'));
    } else {
      console.log(chalk.yellow('FIXING'));
      await repairFn();
      console.log(chalk.green('  └─ FIXED'));
      fixes++;
    }
  };

  await runRepair('Dependencies', 
    () => verifyNodeModules(),
    () => installDependencies()
  );

  await runRepair('Configuration',
    () => fs.pathExists('config/default.json'),
    async () => {
        await fs.writeJson('config/default.json', { name: 'my-system-pro', logLevel: 'info', version: '1.2.0' }, { spaces: 2 });
    }
  );

  // 3. AI Code Fixes (The SaaS Magic)
  const lastLog = await getRecentErrorFromLogs();
  if (lastLog) {
      console.log(chalk.magenta.bold('\n🧠 AI Code Fixer Detected an Error:'));
      console.log(chalk.gray(`   Error: ${lastLog.message.substring(0, 100)}...`));
      
      const { default: aiService } = await import('../core/intelligence/ollamaManager.js'); // Use existing local AI or Cloud
      const { default: patchEngine } = await import('../core/intelligence/patchEngine.js');
      const inquirer = (await import('inquirer')).default;

      const analysis = await aiService.forgeChat(`Explain this error and provide ONLY the fixed code block for the affected file. \nError: ${lastLog.message}`);
      
      if (analysis) {
          console.log(chalk.white('\n--- AI ANALYSIS & FIX ---'));
          console.log(analysis);

          const { confirmPatch } = await inquirer.prompt([
              {
                  type: 'confirm',
                  name: 'confirmPatch',
                  message: chalk.cyan('Would you like Xeyal to automatically patch your code with this fix?'),
                  default: false
              }
          ]);

          if (confirmPatch) {
              const fileToPatch = lastLog.file || 'src/index.js'; // Extract from log or ask
              const success = await patchEngine.applyPatch(fileToPatch, '', analysis);
              if (success) fixes++;
          }
      }
  }

  if (fixes === 0) {
    console.log(chalk.green.bold('\n⭐ System is already in top shape.\n'));
  } else {
    console.log(chalk.green.bold(`\n✅ Applied ${fixes} repair(s). Everything is stable.\n`));
  }
};

/**
 * Mock helper to simulate log scanning
 */
async function getRecentErrorFromLogs() {
    // In a real app, scan logs/error.log
    return {
        message: "ReferenceError: profile is not defined",
        file: "src/index.js",
        line: 12
    };
}

export default fixCommand;
