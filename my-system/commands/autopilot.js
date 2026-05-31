import chalk from 'chalk';
import intelligence from '../core/intelligence/intelligence.js';
import memory from '../core/system/sessionMemory.js';

/**
 * Command: autopilot
 * Manages the autopilot system state.
 */
export const autopilotCommand = async (status) => {
    if (!status) {
        const mem = await memory.getMemory();
        console.log(`\n🤖 Autopilot Status: ${mem.autopilot ? chalk.green('ONLINE') : chalk.red('OFFLINE')}`);
        console.log(chalk.gray(`Total autonomous fixes applied: ${mem.stats.totalFixes}\n`));
        return;
    }

    const value = status.toLowerCase();

    if (value === 'on') {
        autopilot.setEnabled(true);
        console.log(chalk.green('\n✅ Autopilot turned ON. System will now auto-fix safe issues.\n'));
    } else if (value === 'off') {
        autopilot.setEnabled(false);
        console.log(chalk.red('\n🛑 Autopilot turned OFF. Suggestions only mode.\n'));
    } else {
        console.log(chalk.yellow('\n⚠️ Invalid status. Use "on" or "off".\n'));
    }
};

export default autopilotCommand;
