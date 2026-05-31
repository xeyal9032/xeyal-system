#!/usr/bin/env node
import './silence.js';

/**
 * My-System Developer OS (Ultimate Edition)
 * A professional, high-performance developer workspace assistant.
 */

import { Command } from 'commander';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import * as dotenv from 'dotenv';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { initErrorHandler } from '../core/intelligence/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
// Commands are lazy loaded inside their action handlers to optimize cold boot time.
import { loadPlugins } from '../core/runtime/pluginLoader.js';
import { getActiveProject } from '../core/system/projectManager.js';
import state from '../core/system/state.js';

// Load environment variables
dotenv.config();

// Initialize Global Error Handling
initErrorHandler();

const program = new Command();

async function checkOnboarding() {
  const configPath = path.join(ROOT_DIR, 'config/default.json');
  const isGui = process.env.XEYAL_GUI === 'true' || process.argv.includes('--json');
  if (!await fs.pathExists(configPath) && !isGui) {
    console.log(chalk.blue.bold('\n' + '═'.repeat(50)));
    console.log(chalk.white.bold('  🚀 WELCOME TO MY-SYSTEM: YOUR AUTONOMOUS DEV OS'));
    console.log(chalk.blue.bold('═'.repeat(50)));
    console.log(chalk.gray('\n  It looks like this is your first time here.'));
    console.log(chalk.gray('  I will now perform an automatic setup to prepare your'));
    console.log(chalk.gray('  environment for maximum productivity and safety.\n'));

    // Lazy load and run init
    const { initCommand } = await import('../commands/init.js');
    await initCommand();

    console.log(chalk.green.bold('\n  ✅ Setup Complete! You are ready to launch.'));
    console.log(chalk.gray('  Type ') + chalk.cyan('my-system --help') + chalk.gray(' to explore commands.\n'));
    console.log(chalk.blue.bold('═'.repeat(50)) + '\n');
  }
}

async function bootstrap() {
  // 1. Initial Setup
  await state.init();
  
  const isJson = process.argv.includes('--json') || process.env.XEYAL_GUI === 'true';

  if (!isJson) {
      // 2. Display Banner (Only in CLI mode)
      clear();
      console.log(
        chalk.blue(
          figlet.textSync('MY-SYSTEM', { horizontalLayout: 'full' })
        )
      );
      
      // 3. Onboarding Check
      if (!process.argv.includes('init') && !process.argv.includes('--help') && !process.argv.includes('-h')) {
        await checkOnboarding();
      }

      const active = await getActiveProject();
      if (active) {
        console.log(chalk.green(` ⚡ ACTIVE PROJECT: ${chalk.bold(active.name)} | ${chalk.gray(active.path)}`));
      } else {
        console.log(chalk.gray(` ⚡ NO ACTIVE PROJECT | Use 'my-system open' to start`));
      }
      console.log(chalk.gray(` ─`.repeat(50)) + '\n');
  } else {
      // JSON Mode: Minimal state init if needed
      await state.init();
  }

  program
    .name('xeyal-system')
    .description('Ultimate Productivity System for Developers.')
    .version('1.5.1')
    .option('--json', 'Output in JSON format for GUI integration')
    .option('-s, --simulate', 'Run in simulation mode (dry-run without applying actions)');

  program.on('option:simulate', function () {
    global.SIMULATION_MODE = true;
    console.log(chalk.magenta.bold('\n[SIMULATION MODE ENABLED] Dry run engaged.\n'));
  });

  // Core Commands
  program.command('init').description('Initialize environment and config').action(async (...args) => { const { initCommand } = await import('../commands/init.js'); await initCommand(...args); });
  program.command('dev').description('Start development environment').action(async (...args) => { const { devCommand } = await import('../commands/dev.js'); await devCommand(...args); });
  program.command('install').description('Manage project dependencies').action(async (...args) => { const { installCommand } = await import('../commands/install.js'); await installCommand(...args); });
  program.command('doctor').description('Deep system diagnostics').action(async (...args) => { const { doctorCommand } = await import('../commands/doctor.js'); await doctorCommand(...args); });
  program.command('fix [port]').description('Auto-repair environment or kill specific port').action(async (...args) => { const { fixCommand } = await import('../commands/fix.js'); await fixCommand(...args); });

  // Project Management
  program.command('create [name]')
    .description('Scaffold a new project from templates')
    .option('-t, --template <id>', 'Template ID to use')
    .option('--non-interactive', 'Skip interactive prompts')
    .action(async (name, options) => { 
        const { createCommand } = await import('../commands/create.js'); 
        await createCommand(name, options); 
    });
  program.command('open [path]').description('Open project in VS Code and register it').action(async (...args) => { const { openCommand } = await import('../commands/open.js'); await openCommand(...args); });
  program.command('list').description('List all registered projects').action(async (...args) => { const { listCommand } = await import('../commands/list.js'); await listCommand(...args); });
  program.command('switch [name]').description('Switch active project context').action(async (...args) => { const { switchCommand } = await import('../commands/switch.js'); await switchCommand(...args); });

  // Utilities
  program.command('clean').description('Deep cleanup of modules, logs, and cache').action(async (...args) => { const { cleanCommand } = await import('../commands/clean.js'); await cleanCommand(...args); });
  program.command('status').description('CLI system and project health dashboard').action(async (...args) => { const { statusCommand } = await import('../commands/status.js'); await statusCommand(...args); });
  program.command('autopilot [status]').description('Toggle Autopilot mode (on/off/status)').action(async (...args) => { const { autopilotCommand } = await import('../commands/autopilot.js'); await autopilotCommand(...args); });
  program.command('run <type> <name>').description('Run a service stack (type: WEB/MOBILE/UTILITY)').action(async (...args) => { const { stackCommand } = await import('../commands/stack.js'); await stackCommand(...args); });
  program.command('explain <input>').description('Explain an error log or message').action(async (...args) => { const { explainCommand } = await import('../commands/explain.js'); await explainCommand(...args); });
  program.command('skills <action> [id]')
    .description('Manage AI agents and skills (list/launch/stop)')
    .option('--json', 'Output in JSON format')
    .action(async (action, id, options) => { 
        const { skillsCommand } = await import('../commands/skills.js'); 
        await skillsCommand(action, id, { json: options.json || process.argv.includes('--json') }); 
    });
  program.command('marketplace <action> [id]').description('Discover and install community plugins').action(async (action, id, options) => { const { marketplaceCommand } = await import('../commands/marketplace.js'); await marketplaceCommand(action, id, options); });
  program.command('cockpit').description('Launch the tactical TUI cockpit').action(async (...args) => { const { cockpitCommand } = await import('../commands/cockpit.js'); await cockpitCommand(...args); });
  program.command('cluster').description('Launch the entire Xeyal-System cluster (Cloud + Dashboard + Core)').action(async () => {
      const { spawn } = await import('child_process');
      spawn('node', ['../launch-all.js'], { stdio: 'inherit', shell: true });
  });
  program.command('snapshot [action] [id]')
    .description('Manage system restore points (list/create/restore)')
    .action(async (action, id, options) => { 
        const { snapshotCommand } = await import('../commands/snapshot.js'); 
        await snapshotCommand(action, id, options); 
    });

  // AI Forge Internal Bridge
  program.command('intelligence-chat')
    .description('Internal: Proxy chat requests to Ollama')
    .option('--model <model>', 'Model to use')
    .option('--prompt <prompt>', 'Prompt text')
    .action(async (options) => {
        let prompt = options.prompt;
        
        // If no prompt in args, read from stdin (for long contexts)
        if (!prompt) {
            prompt = await new Promise((resolve, reject) => {
                let data = [];
                process.stdin.on('data', chunk => data.push(chunk));
                process.stdin.on('end', () => resolve(Buffer.concat(data).toString()));
                process.stdin.on('error', reject);
                // Safety timeout
                setTimeout(() => { if (data.length === 0) resolve(''); }, 5000);
            });
        }

        const { default: ollama } = await import('../core/intelligence/ollamaManager.js');
        const response = await ollama.forgeChat(prompt, options.model);
        console.log(`XEYAL_JSON_DATA_START${JSON.stringify({ response })}XEYAL_JSON_DATA_END`);
    });

  // Help Customization
  program.addHelpText('after', `
\nExamples:
  $ xeyal-system create my-new-app     # Scaffold a new project
  $ xeyal-system open ./my-app         # Open and register project
  $ xeyal-system dev                   # Start everything
  $ xeyal-system fix 3000              # Kill process on port 3000
  $ xeyal-system doctor                # Deep health check
`);

  // Plugins
  const config = await fs.readJson('config/default.json').catch(() => ({}));
  await loadPlugins(program, config);

  program.parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

bootstrap();
