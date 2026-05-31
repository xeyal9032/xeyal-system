import serviceManager from './core/runtime/serviceManager.js';
import logger from './core/system/logger.js';
import bus from './core/system/events.js';
import fs from 'fs-extra';
import { spawn } from 'child_process';
import path from 'path';

async function runVerification() {
    logger.info('--- Starting Phase 3 (Intelligence Layer) Verification ---');

    console.log('\n[1] Creating a broken service (missing dependency)');
    const brokenServiceCode = `
        import 'this-module-is-very-fake';
        console.log("Starting broken service...");
    `;
    await fs.writeFile('brokenService.js', brokenServiceCode);

    // Listen to bus for AutoFix events
    bus.on('AUTONOMOUS_FIX_INITIATED', (message) => {
        logger.info(`✅ BUS EVENT RECEIVED: AutoFix Initiated for ${message.payload.name} (${message.payload.type})`);
    });

    bus.on('AUTONOMOUS_FIX_SUCCESS', (message) => {
        logger.info(`✅ BUS EVENT RECEIVED: AutoFix Success! ${message.payload.name} recovered.`);
    });

    // We expect serviceManager to capture stderr, analyze it, and run ACTION_INSTALL_DEP
    logger.info('Starting service via ServiceManager...');
    serviceManager.startService({
        name: 'BrokenService',
        cmd: 'node brokenService.js',
        restart: true
    });

    // Wait 10 seconds. AutoFix should fail to install "fake-missing-module-12345" because it doesn't exist, but it SHOULD log the attempt!
    setTimeout(async () => {
        logger.info('--- Phase 3 Verification Complete (Check logs for AUTOFIX initiation) ---');
        serviceManager.stopAll();
        if (await fs.pathExists('brokenService.js')) {
            await fs.remove('brokenService.js');
        }
        process.exit(0);
    }, 10000);
}

runVerification();
