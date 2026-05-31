import fs from 'fs-extra';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';
import logger from '../system/logger.js';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Dynamic Plugin Loader
 * Scans the plugins directory and registers discovered commands/hooks.
 */
export const loadPlugins = async (program, config) => {
  const pluginsDir = path.resolve(__dirname, '../../plugins');
  
  // Ensure plugins directory exists
  await fs.ensureDir(pluginsDir);

  const files = await fs.readdir(pluginsDir);
  const jsFiles = files.filter(file => file.endsWith('.js'));

  if (jsFiles.length === 0) {
    logger.info('No external plugins found.');
    return;
  }

  logger.info(`Found ${jsFiles.length} potential plugins. Initializing...`);

  for (const file of jsFiles) {
    try {
      const pluginPath = path.join(pluginsDir, file);
      const pluginUrl = pathToFileURL(pluginPath).href;
      
      const plugin = await import(pluginUrl);
      
      // CREATE SANDBOX API
      const { default: permissions } = await import('../system/permissions.js');
      const { default: bus } = await import('../system/events.js');
      const { spawn } = await import('child_process');

      const safeApi = {
          logger: {
              info: (msg) => logger.info(`[Plugin:${file}] ${msg}`),
              warn: (msg) => logger.warn(`[Plugin:${file}] ${msg}`),
              error: (msg) => logger.error(`[Plugin:${file}] ${msg}`)
          },
          events: {
              on: (evt, cb) => bus.on(evt, cb),
              emit: (evt, data) => bus.broadcast(evt, 'PLUGIN', data)
          },
          config: config,
          /**
           * Restricted execution for plugins
           */
          safeExec: (cmd, args = [], options = {}) => {
              if (permissions.can('PLUGIN', 'EXECUTE') && permissions.isCommandSafe(cmd)) {
                  return spawn(cmd, args, { ...options, shell: true });
              } else {
                  logger.error(`Plugin ${file} blocked from executing command: ${cmd}`);
                  return null;
              }
          }
      };

      if (plugin.default && typeof plugin.default.register === 'function') {
        plugin.default.register(program, safeApi);
        logger.info(`Plugin registered with Sandbox: ${file}`);
      } else {
        logger.warn(`Plugin ${file} does not export a valid register function.`);
      }
    } catch (error) {
      console.error(chalk.red(`[Plugin] Failed to load ${file}:`), error.message);
      logger.error(`Failed to load plugin ${file}: ${error.stack}`);
    }
  }
};

export default {
  loadPlugins
};
