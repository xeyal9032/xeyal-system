import chalk from 'chalk';
import intelligence from '../core/intelligence/intelligence.js';
import fs from 'fs-extra';

/**
 * Command: explain [file/message]
 */
export const explainCommand = async (input) => {
    let errorText = input;

    // Check if input is a file path
    if (await fs.pathExists(input)) {
        errorText = await fs.readFile(input, 'utf8');
    }

    const report = await intelligence.explain(errorText);

    console.log(`\n${chalk.cyan.bold('🧠 INTELLIGENCE EXPLANATION:')}`);
    console.log(`${chalk.white.bold('   Title:')} ${report.title}`);
    console.log(`${chalk.white('   Explanation:')} ${report.explanation}`);
    console.log(`${chalk.white('   Prevention:')} ${report.prevention}\n`);
};

export default explainCommand;
