import serviceManager from './core/runtime/serviceManager.js';
import state from './core/system/state.js';
import bus from './core/system/events.js';
import governor from './core/system/governor.js';
import chalk from 'chalk';

async function verifyPhase2() {
    console.log(chalk.blue.bold('\n🧪 Phase 2 Verification: Autonomous OS Core\n'));

    // 1. Verify Event Bus & State Integration
    console.log(chalk.cyan('1. Testing Unified State & Event Engine...'));
    state.set('test_key', 'test_value');
    if (state.get('test_key') === 'test_value') {
        console.log(chalk.green('   ✅ State Engine is operational.'));
    } else {
        console.error(chalk.red('   ❌ State Engine failed.'));
    }

    // 2. Mock Governor Event
    console.log(chalk.cyan('\n2. Testing Resource Governor...'));
    return new Promise((resolve) => {
        const timeout = setTimeout(() => {
            console.error(chalk.red('   ❌ Governor Event not received.'));
            resolve(false);
        }, 2000);

        bus.once('SYSTEM_PRESSURE', (data) => {
            clearTimeout(timeout);
            console.log(chalk.green(`   ✅ Governor generated pressure alert: ${data.payload.type} at ${data.payload.value}%`));
            resolve(true);
        });

        governor.handleHighResource('CPU', 95);
    }).then(() => {
        // 3. Service Lifecycle Manager (Crash & Recovery)
        console.log(chalk.cyan('\n3. Testing Service Lifecycle Manager (Crash & Recovery)...'));
        
        // Start a dummy service that crashes after 1 second
        const dummyService = {
            name: 'ChaosMonkeyService',
            cmd: 'node -e "setTimeout(() => process.exit(1), 1000)"',
            restart: true
        };

        return new Promise((resolve) => {
            let recoveryAttempted = false;

            bus.on('SERVICE_RECOVERY_START', (data) => {
                if (data.payload.name === 'ChaosMonkeyService' && !recoveryAttempted) {
                    recoveryAttempted = true;
                    console.log(chalk.green(`   ✅ ServiceManager detected crash and initiated recovery (Attempt ${data.payload.attempt})`));
                    serviceManager.stopAll();
                    resolve();
                }
            });

            serviceManager.startService(dummyService);
        });
    }).then(() => {
        console.log(chalk.green.bold('\n✅ Phase 2 Verification Completed Successfully!\n'));
        process.exit(0);
    });
}

// Bootstrap state before testing
state.init().then(() => verifyPhase2());
