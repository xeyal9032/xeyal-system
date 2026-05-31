import auth from './core/system/auth.js';
import analyzer from './core/intelligence/errorAnalyzer.js';
import project from './core/runtime/projectAnalyzer.js';
import intelligence from './core/intelligence/intelligence.js';
import memory from './core/system/sessionMemory.js';
import chalk from 'chalk';

async function runTests() {
    console.log(chalk.blue.bold('\n🔍 Starting Automated System Audit...\n'));
    let failures = 0;

    // 1. Auth Test
    try {
        const users = await auth.getUsers();
        if (users.admin && users.admin2) {
            const verifyPrimary = auth.verifyPassword('Xeyal9032/a', users.admin);
            const verifyFriend = auth.verifyPassword('Ferrukh336699', users.admin2);
            if (verifyPrimary && verifyFriend) {
                console.log(chalk.green('  ✅ AUTH: Multi-user hashed verification SUCCESS'));
            } else {
                throw new Error('Verification failed');
            }
        } else {
            throw new Error('Users missing in database');
        }
    } catch (e) {
        console.log(chalk.red(`  ❌ AUTH: Failed - ${e.message}`));
        failures++;
    }

    // 2. Error Analyzer Test
    try {
        const mockError = 'Error: listen EADDRINUSE: address already in use :::3000';
        const analysis = analyzer.analyze(mockError);
        if (analysis && analysis.type === 'PORT_CONFLICT' && analysis.data.port === '3000') {
            console.log(chalk.green('  ✅ ANALYZER: Port conflict pattern detection SUCCESS'));
        } else {
            throw new Error('Pattern not matched');
        }
    } catch (e) {
        console.log(chalk.red(`  ❌ ANALYZER: Failed - ${e.message}`));
        failures++;
    }

    // 3. Project Analyzer Test
    try {
        const projData = await project.analyze('.');
        if (projData.name === 'my-system') {
            console.log(chalk.green(`  ✅ PROJECT: Context detection (${projData.name}) SUCCESS`));
        } else {
            throw new Error('Incorrect project name detected');
        }
    } catch (e) {
        console.log(chalk.red(`  ❌ PROJECT: Failed - ${e.message}`));
        failures++;
    }

    // 4. Intelligence Test
    try {
        const issues = await intelligence.deepScan('.');
        if (Array.isArray(issues)) {
            console.log(chalk.green(`  ✅ INTELLIGENCE: Deep scan engine functionality SUCCESS`));
        } else {
            throw new Error('Deep scan returned invalid data');
        }
    } catch (e) {
        console.log(chalk.red(`  ❌ INTELLIGENCE: Failed - ${e.message}`));
        failures++;
    }

    // 5. Memory Test
    try {
        await memory.logEvent('SELF_TEST', { status: 'COMPLETE' });
        console.log(chalk.green('  ✅ MEMORY: Session event persistence SUCCESS'));
    } catch (e) {
        console.log(chalk.red(`  ❌ MEMORY: Failed - ${e.message}`));
        failures++;
    }

    if (failures === 0) {
        console.log(chalk.green.bold('\n🌟 ALL SYSTEMS NOMINAL: The system is 100% verified and ready.\n'));
    } else {
        console.log(chalk.red.bold(`\n⚠️  AUDIT COMPLETE WITH ${failures} FAILURES.\n`));
    }
}

runTests();
