import chalk from 'chalk';
import { getFullStatus } from '../core/system/systemStatus.js';
import { getActiveProject } from '../core/system/projectManager.js';

/**
 * Command: status
 * Displays CLI-based system and project status.
 */
export const statusCommand = async () => {
    const isJson = process.argv.includes('--json');

    try {
        const status = await getFullStatus();
        const active = await getActiveProject();

        if (isJson) {
            console.log(`XEYAL_JSON_DATA_START${JSON.stringify(status.ports)}XEYAL_JSON_DATA_END`);
            return;
        }

        console.log(chalk.blue.bold('\n📊 System Status Dashboard:\n'));
        // 1. Project Context
        console.log(chalk.white.bold('  [ Context ]'));
        console.log(chalk.gray(`  Current Project: ${active ? chalk.green(active.name) : chalk.yellow('None selected')}`));
        console.log(chalk.gray(`  Working Path:    ${active ? active.path : 'N/A'}\n`));

        // 2. Hardware
        console.log(chalk.white.bold('  [ Performance ]'));
        console.log(chalk.gray(`  CPU Load:   ${formatBar(status.cpu.load)} ${status.cpu.load}%`));
        console.log(chalk.gray(`  Memory:     ${formatBar(status.memory.percentage)} ${status.memory.used}GB / ${status.memory.total}GB`));
        console.log(chalk.gray(`  Disk Use:   ${formatBar(status.disk.percentage)} ${status.disk.percentage}%\n`));

        // 3. Active Ports
        console.log(chalk.white.bold('  [ Active Ports ]'));
        if (status.ports.length === 0) {
            console.log(chalk.gray('  No active dev ports detected.'));
        } else {
            status.ports.slice(0, 5).forEach(p => {
                console.log(chalk.gray(`  Port ${chalk.cyan(p.port.toString().padEnd(6))} → PID: ${p.pid.toString().padEnd(8)} [${p.process}]`));
            });
            if (status.ports.length > 5) console.log(chalk.gray(`  ...and ${status.ports.length - 5} more.`));
        }

        console.log('\n');

    } catch (error) {
        if (isJson) {
            console.log('XEYAL_JSON_DATA_START[]XEYAL_JSON_DATA_END');
        } else {
            console.error(chalk.red('❌ Failed to fetch status:'), error.message);
        }
    }
};

function formatBar(percent) {
    const size = 20;
    const filled = Math.round((percent / 100) * size);
    const bar = '█'.repeat(filled) + '░'.repeat(size - filled);
    
    if (percent > 80) return chalk.red(bar);
    if (percent > 50) return chalk.yellow(bar);
    return chalk.green(bar);
}

export default statusCommand;
