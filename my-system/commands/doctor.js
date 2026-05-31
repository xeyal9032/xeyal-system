import chalk from 'chalk';
import logger from '../core/system/logger.js';
import fs from 'fs-extra';
import si from 'systeminformation';
import { execSync } from 'child_process';

/**
 * Enhanced Command: doctor
 * Performs deep system diagnostics including hardware and security.
 */
export const doctorCommand = async () => {
  console.log(chalk.blue.bold('\n🩺 Deep System Diagnostics...\n'));
  let issues = 0;

  const check = async (name, fn) => {
    process.stdout.write(chalk.white(`Checking ${name}... `));
    try {
      const result = await fn();
      if (result === true || result === undefined) {
        console.log(chalk.green('PASSED'));
      } else {
        console.log(chalk.yellow('WARNING'));
        console.log(chalk.gray(`  └─ ${result}`));
      }
    } catch (error) {
      console.log(chalk.red('FAILED'));
      console.log(chalk.gray(`  └─ ${error.message}`));
      issues++;
    }
  };

  // 1. Basic Checks
  await check('Node.js version', () => {
    const major = parseInt(process.version.slice(1).split('.')[0]);
    if (major < 18) throw new Error(`Node v${major} detected. v18+ required.`);
  });

  await check('Project structure', async () => {
    const required = ['package.json', 'cli', 'core', 'commands', 'config', 'logs'];
    for (const dir of required) {
      if (!await fs.pathExists(dir)) throw new Error(`Missing ${dir}`);
    }
  });

  // 2. Hardware Checks
  await check('Disk space', async () => {
    const disk = await si.fsSize();
    const use = disk[0].use;
    if (use > 90) throw new Error(`Disk is ${use}% full. High risk.`);
    if (use > 80) return `Disk is ${use}% full. Consider cleanup.`;
  });

  await check('Memory availability', async () => {
    const mem = await si.mem();
    const free = mem.available / 1024 / 1024 / 1024; // GB
    if (free < 0.5) throw new Error(`Only ${free.toFixed(2)}GB RAM free. Performance may suffer.`);
  });

  // 3. Security Checks
  await check('Security vulnerabilities', () => {
    try {
      execSync('npm audit --audit-level=high', { stdio: 'pipe' });
    } catch (error) {
      return 'High-level vulnerabilities detected. Run "npm audit fix".';
    }
  });

  if (issues === 0) {
    console.log(chalk.green.bold('\n✅ System is fully operational and healthy.\n'));
    logger.info('Pro Doctor check: ALL PASSED');
  } else {
    console.log(chalk.red.bold(`\n❌ Found ${issues} critical issue(s). Run "my-system fix" to repair.\n`));
  }
};

export default doctorCommand;
