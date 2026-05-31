import state from './core/system/state.js';
import bus from './core/system/events.js';
import dashboard from './core/system/dashboard.js';
import governor from './core/system/governor.js';
import logger from './core/system/logger.js';
import chalk from 'chalk';

/**
 * My-System: Autonomous OS Entry Point
 * This process acts as the "Cerebrum", keeping the system alive.
 */
async function boot() {
    console.log(chalk.blue.bold('\n🧠 My-System: Autonomous OS Booting...\n'));

    try {
        // 1. Initialize State Engine
        await state.init();
        logger.info('State Engine initialized.', { category: 'SYSTEM' });

        // 2. Start Resource Governor
        governor.start(5000);
        logger.info('Resource Governor active.', { category: 'SYSTEM' });

        // 3. Start Intelligent Dashboard
        await dashboard.startDashboard();
        logger.info('Intelligent Dashboard started.', { category: 'SYSTEM' });

        // 4. Global Event Listeners
        bus.on('SYSTEM_PRESSURE', (data) => {
            console.log(chalk.red.bold(`\n⚠️  SYSTEM PRESSURE DETECTED: ${data.payload.type} at ${data.payload.value}%`));
        });

        bus.on('CRASH_DETECTED', (data) => {
            console.log(chalk.red.bold(`\n🛑 CRITICAL: System crash detected! Total: ${data.payload.count}`));
            if (state.get('safeMode')) {
                console.log(chalk.bgRed.white.bold(' !!! SYSTEM ENTERED SAFE MODE !!! '));
            }
        });

        console.log(chalk.green.bold('\n🚀 My-System is fully operational and autonomous.\n'));

    } catch (error) {
        console.error(chalk.red('Failed to boot My-System:'), error);
        process.exit(1);
    }
}

// Handle termination gracefully
process.on('SIGINT', () => {
    console.log(chalk.yellow('\nShutting down My-System...'));
    governor.stop();
    process.exit(0);
});

boot();
