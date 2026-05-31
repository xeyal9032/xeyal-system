import chalk from 'chalk';
import orchestrator from '../core/runtime/orchestrator.js';

/**
 * Command: run stack <category> <name>
 */
export const stackCommand = async (category, name) => {
    try {
        await orchestrator.runStack(category.toUpperCase(), name.toUpperCase());
    } catch (error) {
        console.error(chalk.red('\n❌ Stack failed:'), error.message);
    }
};

export default stackCommand;
