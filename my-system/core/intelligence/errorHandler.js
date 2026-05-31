import logger from '../system/logger.js';
import chalk from 'chalk';
import intelligence from './intelligence.js';
import alertSystem from './alertSystem.js';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Intelligent Error Handler (Production Edition)
 * Catch-all for uncaught exceptions and rejections.
 */
export const initErrorHandler = () => {
  process.on('uncaughtException', (error) => {
    handleFatalError('Uncaught Exception', error);
  });

  process.on('unhandledRejection', (reason, promise) => {
    handleFatalError('Unhandled Rejection', reason);
  });

  logger.info('Intelligent error monitoring initialized.');
};

/**
 * Log and display fatal errors with Intelligence.
 */
const handleFatalError = (type, error) => {
  const errorMessage = error instanceof Error ? error.stack : JSON.stringify(error);
  const briefMessage = error instanceof Error ? error.message : String(error);

  // In production, we exit for stability if it's an uncaught exception
  const isJson = process.argv.includes('--json');

  try {
    // 1. Permanent Logging (Diagnostic) - Use absolute path relative to system root
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const SYSTEM_ROOT = path.resolve(__dirname, '../../');
    const diagnosticLog = path.join(SYSTEM_ROOT, 'logs/diagnostic.log');

    fs.ensureDirSync(path.dirname(diagnosticLog));
    const logEntry = `[${new Date().toISOString()}] [${type}] ${errorMessage}\n\n`;
    fs.appendFileSync(diagnosticLog, logEntry);

    // 2. Analyze with Intelligence Engine
    const analysis = intelligence.analyze(briefMessage);

    // 3. UI/Output Handling
    if (isJson) {
        // Output PURE JSON so the UI can capture the error
        console.log(JSON.stringify({
            error: type,
            message: briefMessage,
            suggestion: analysis?.suggestion,
            log: diagnosticLog
        }));
    } else {
        // Human Friendly Box
        const cols = process.stdout.columns || 80;
        console.error('\n' + chalk.bgRed.white.bold(` ERROR `) + chalk.red(` ${type} encountered.`));
        console.error(chalk.gray('─'.repeat(cols)));
        
        if (analysis) {
            console.log(chalk.cyan.bold('💡 INTELLIGENCE SUGGESTION:'));
            console.log(chalk.white(`   ${analysis.suggestion}`));
        } else {
            console.error(chalk.white(`   ${briefMessage}`));
        }

        console.error(chalk.gray('\nFull diagnostic logs available at: ') + chalk.underline(diagnosticLog));
        console.error(chalk.gray('─'.repeat(cols)) + '\n');
    }

    // 4. OS Integration
    alertSystem.notify('error', type, briefMessage);
    logger.error(`${type}: ${errorMessage}`, { category: 'FATAL' });
  } catch (innerError) {
    if (isJson) {
        console.log(JSON.stringify({ error: 'CRITICAL', message: 'Error handler failed' }));
    } else {
        console.error('CRITICAL: Error handler failed.', innerError);
    }
  }

  // In production, we exit for stability if it's an uncaught exception
  process.exit(1);
};

export default {
  initErrorHandler
};
