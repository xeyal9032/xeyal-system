import chalk from 'chalk';
import logger from '../core/system/logger.js';
import { runLint, installDependencies, detectProjectType, getDevCommand } from '../core/runtime/packageManager.js';
import { startWatcher } from '../core/runtime/watcher.js';
import { startDashboard } from '../core/system/dashboard.js';
import { getActiveProject } from '../core/system/projectManager.js';
import autopilot from '../core/intelligence/autopilot.js';
import { cockpitCommand } from './cockpit.js';
import orchestrator from '../core/runtime/orchestrator.js';
import state from '../core/system/state.js';
import fs from 'fs-extra';
import serviceManager from '../core/runtime/serviceManager.js';

/**
 * Command: dev (The core development workflow)
 * Starts the project, installs deps if needed, starts dashboard and watcher.
 */
export const devCommand = async () => {
  if (state.get('dev_running')) {
      console.log(chalk.yellow('\n⚡ Dev environment is already running. (Idempotent call ignored)'));
      return;
  }
  state.set('dev_running', true);

  const active = await getActiveProject();
  const targetPath = active ? active.path : '.';
  const targetName = active ? active.name : 'Current Project';

  if (global.SIMULATION_MODE) {
      console.log(chalk.magenta.bold('\n[SIMULATION MODE] No real actions will be taken.'));
  }

  console.log(chalk.blue.bold(`\n🚀 Starting Development Environment: ${targetName}\n`));
  await autopilot.init();
  logger.event('DEV_START', 'WORKFLOW', { project: targetName });

  try {
    // 1. Detect project type & install deps if needed
    const project = await detectProjectType(targetPath);
    if (project) {
      const depDir = project.depDir ? `${targetPath}/${project.depDir}` : null;
      const depsInstalled = depDir ? await fs.pathExists(depDir) : false;
      if (!depsInstalled) {
        console.log(chalk.yellow(`  ⚠️  Dependencies missing. Initializing installation...`));
        logger.warn('Dependencies missing, auto-installing...', { category: 'WORKFLOW' });
        await installDependencies(targetPath);
      }
    }

    // 2. Run Linting
    await runLint(targetPath);

    // 3. AUTO-START PROJECT
    const devCmd = await getDevCommand(targetPath);
    if (devCmd) {
        console.log(chalk.gray(`  - Auto-launching project: ${chalk.white(devCmd.cmd)} ${devCmd.icon}`));
        if (!global.SIMULATION_MODE) {
            await serviceManager.startService({
                name: targetName,
                cmd: devCmd.cmd,
                cwd: targetPath,
                restart: true
            });
        }
    }

    // 4. Start Web Dashboard (CLI mode only)
    if (process.env.XEYAL_GUI !== 'true') {
      console.log(chalk.gray('  - Initializing Web Dashboard...'));
      if (!global.SIMULATION_MODE) await startDashboard();
    }

    // 5. Start File Watcher
    if (process.env.XEYAL_GUI !== 'true') {
      console.log(chalk.gray('  - Starting File Watcher on: ' + targetPath));
    }
    if (!global.SIMULATION_MODE) startWatcher(targetPath);

    console.log(chalk.green.bold(`\n✅ ${targetName} is ready and monitored.`));
    if (process.env.XEYAL_GUI !== 'true') {
      console.log(chalk.gray('Dashboard running at http://localhost:3000\n'));
    }

    // 6. AUTO-LAUNCH COCKPIT (Tactical TUI) - Skip if in GUI mode
    if (process.env.XEYAL_GUI !== 'true' && process.env.AUTO_LAUNCH_COCKPIT !== 'false') {
        setTimeout(() => {
            cockpitCommand();
        }, 2000);
    } else if (process.env.XEYAL_GUI === 'true') {
        console.log(chalk.cyan('  - GUI Environment Detected. Cockpit TUI suppressed.'));
    }

  } catch (error) {
    console.error(chalk.red('\n❌ Dev environment failed:'), error.message);
    logger.error(`Dev command failure: ${error.stack}`);
    state.set('dev_running', false);
  }
};

export default devCommand;
