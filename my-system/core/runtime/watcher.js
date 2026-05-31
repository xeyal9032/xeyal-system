import chokidar from 'chokidar';
import logger from '../system/logger.js';
import chalk from 'chalk';
import path from 'path';

/**
 * File watcher system using Chokidar.
 * Monitors project files and triggers actions on change.
 */
export const startWatcher = (directory = '.') => {
  const watcher = chokidar.watch(directory, {
    ignored: [
      /(^|[\/\\])\../, // ignore dotfiles
      '**/node_modules/**',
      '**/logs/**',
      '**/.git/**',
      '**/package-lock.json',
      '**/yarn.lock',
      '**/pnpm-lock.yaml',
      '**/composer.lock',
      '**/vendor/**'
    ],
    persistent: true,
    ignoreInitial: true
  });

  logger.info(`Watcher started for directory: ${path.resolve(directory)}`);

  watcher
    .on('add', path => {
      console.log(chalk.cyan(`[Watcher] File added: ${path}`));
      logger.info(`File added: ${path}`);
    })
    .on('change', path => {
      console.log(chalk.yellow(`[Watcher] File changed: ${path}`));
      logger.info(`File changed: ${path}`);
      // In a real system, you might trigger a restart or hot reload here
      console.log(chalk.green('🔄 System restart simulated on file change.'));
    })
    .on('unlink', path => {
      console.log(chalk.red(`[Watcher] File removed: ${path}`));
      logger.warn(`File removed: ${path}`);
    });

  return watcher;
};

export default {
  startWatcher
};
