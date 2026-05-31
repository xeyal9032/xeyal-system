import fs from 'fs-extra';
import path from 'path';
import { execSync, spawn } from 'child_process';
import chalk from 'chalk';
import si from 'systeminformation';
import dotenv from 'dotenv';

dotenv.config();

const ROOT = process.cwd();
const REPORT = {
    timestamp: new Date().toISOString(),
    status: 'HEALTHY',
    checks: []
};

function addCheck(name, status, message, details = null) {
    REPORT.checks.push({ name, status, message, details });
    const color = status === 'PASS' ? chalk.green : (status === 'WARN' ? chalk.yellow : chalk.red);
    console.log(`${color(`[${status}]`)} ${chalk.bold(name)}: ${message}`);
    if (status === 'FAIL') REPORT.status = 'DEGRADED';
}

async function runDiagnostics() {
    console.log(chalk.blue.bold('\n🛡️  Xeyal-System Integrity Audit v1.0\n'));
    console.log(chalk.gray(`Target: ${ROOT}\n`));

    // 1. Environment Audit
    try {
        const nodeVer = process.version;
        const isWin = process.platform === 'win32';
        if (isWin) {
            addCheck('OS Check', 'PASS', `Windows detected (${process.arch})`);
        } else {
            addCheck('OS Check', 'WARN', `Non-Windows platform (${process.platform}). Some features (native picker) may be limited.`);
        }
        
        if (nodeVer.startsWith('v20') || nodeVer.startsWith('v21') || nodeVer.startsWith('v22')) {
            addCheck('Node.js version', 'PASS', nodeVer);
        } else {
            addCheck('Node.js version', 'WARN', `${nodeVer} (Recommended: v20+)`);
        }
    } catch (e) {
        addCheck('Environment', 'FAIL', `Audit failed: ${e.message}`);
    }

    // 2. Architecture Validation
    const requiredDirs = ['cli', 'core', 'core/system', 'core/intelligence', 'core/runtime', 'dashboard/public', 'config', 'commands'];
    for (const dir of requiredDirs) {
        if (await fs.pathExists(path.join(ROOT, dir))) {
            addCheck('Structure', 'PASS', `Directory confirmed: ${dir}`);
        } else {
            addCheck('Structure', 'FAIL', `Missing directory: ${dir}`);
        }
    }

    const requiredFiles = ['cli/index.js', 'package.json', 'main.js', 'core/system/dashboard.js'];
    for (const file of requiredFiles) {
        if (await fs.pathExists(path.join(ROOT, file))) {
            addCheck('Integrity', 'PASS', `File confirmed: ${file}`);
        } else {
            addCheck('Integrity', 'FAIL', `Missing file: ${file}`);
        }
    }

    // 3. Config Health
    const configDir = path.join(ROOT, 'config');
    try {
        const configs = await fs.readdir(configDir);
        for (const conf of configs) {
            if (conf.endsWith('.json')) {
                try {
                    const content = await fs.readJson(path.join(configDir, conf));
                    addCheck(`Config: ${conf}`, 'PASS', 'Valid JSON structure');
                } catch (e) {
                    addCheck(`Config: ${conf}`, 'FAIL', `JSON Parse Error: ${e.message}`);
                }
            }
        }
    } catch (e) {
        addCheck('Config Directory', 'FAIL', `Could not read config dir: ${e.message}`);
    }

    // 4. Intelligence Diagnostic (AI Check)
    console.log(chalk.cyan('\n🧠 Probing Intelligence Layer...'));
    try {
        // Check Ollama install
        let ollamaInstalled = false;
        try {
            execSync('ollama --version', { stdio: 'ignore' });
            ollamaInstalled = true;
            addCheck('Ollama Installation', 'PASS', 'Ollama is installed on PATH');
        } catch {
            addCheck('Ollama Installation', 'WARN', 'Ollama not found on PATH. Local AI features will be disabled.');
        }

        if (ollamaInstalled) {
            try {
                const res = await fetch('http://127.0.0.1:11434/api/tags').catch(() => null);
                if (res && res.ok) {
                    const data = await res.json();
                    const models = data.models.map(m => m.name);
                    addCheck('Ollama API', 'PASS', `Connected. Available models: ${models.join(', ')}`);
                    
                    if (models.some(m => m.includes('llama3'))) {
                        addCheck('AI Model (llama3)', 'PASS', 'Preferred model llama3 is ready.');
                    } else {
                        addCheck('AI Model (llama3)', 'WARN', 'llama3 not found. System will attempt to pull it during first use.');
                    }
                } else {
                    addCheck('Ollama API', 'WARN', 'Ollama installed but server is not running (http://127.0.0.1:11434).');
                }
            } catch (e) {
                addCheck('Ollama API', 'WARN', `API probe failed: ${e.message}`);
            }
        }

        // Gemini Check
        if (process.env.GEMINI_API_KEY) {
            addCheck('Gemini Fallback', 'PASS', 'API Key detected. Cloud intelligence fallback is ACTIVE.');
        } else {
            addCheck('Gemini Fallback', 'WARN', 'GEMINI_API_KEY not found in .env. No cloud fallback available.');
        }
    } catch (e) {
        addCheck('Intelligence', 'FAIL', `Critical diagnostic failure: ${e.message}`);
    }

    // 5. Server Readiness
    console.log(chalk.cyan('\n🖥️  Testing Server Readiness...'));
    try {
        const dashboardPath = path.join(ROOT, 'core/system/dashboard.js');
        const dashboardModule = await import(`file://${dashboardPath}`).catch((err) => {
            addCheck('Dashboard Module', 'FAIL', `Import error: ${err.message}`);
            return null;
        });
        if (dashboardModule) {
            addCheck('Dashboard Module', 'PASS', 'Loaded successfully.');
        }

        // Port check
        const PORT = process.env.DASHBOARD_PORT || 3000;
        const portInUse = await si.networkConnections().then(conns => conns.some(c => c.localPort === PORT.toString()));
        if (portInUse) {
            addCheck('Port Availability', 'WARN', `Port ${PORT} is currently in use. System will attempt to clear it on start.`);
        } else {
            addCheck('Port Availability', 'PASS', `Port ${PORT} is free.`);
        }
    } catch (e) {
        addCheck('Server Audit', 'FAIL', e.message);
    }

    // 6. CLI Probe
    console.log(chalk.cyan('\n🛠️  Probing CLI Logic...'));
    try {
        const cliOutput = execSync(`node cli/index.js status --json`, { encoding: 'utf8', env: { ...process.env, XEYAL_GUI: 'true' } });
        if (cliOutput.includes('XEYAL_JSON_DATA_START')) {
            addCheck('CLI Logic', 'PASS', 'Status command returns valid JSON envelope.');
        } else {
            addCheck('CLI Logic', 'WARN', 'CLI output did not contain expected JSON tags. Check cli/index.js.');
        }
    } catch (e) {
        addCheck('CLI Logic', 'FAIL', `Command failed: ${e.message}`);
    }

    // Final Report
    console.log('\n' + '='.repeat(50));
    const finalColor = REPORT.status === 'HEALTHY' ? chalk.bgGreen.black : chalk.bgYellow.black;
    console.log(`${finalColor(`  SYSTEM STATUS: ${REPORT.status}  `)}`);
    console.log('='.repeat(50) + '\n');

    if (REPORT.status === 'DEGRADED') {
        console.log(chalk.red.bold('CRITICAL ISSUES FOUND!'));
        console.log(chalk.red('Please address the [FAIL] items above before running the system.\n'));
    } else {
        console.log(chalk.green.bold('System is READY for development.'));
        console.log(chalk.green('You can launch the environment with: npm run dev\n'));
    }

    await fs.writeJson(path.join(ROOT, 'integrity-report.json'), REPORT, { spaces: 2 });
}

runDiagnostics().catch(err => {
    console.error(chalk.red('\n🛑 Diagnostic tool crashed:'), err);
    process.exit(1);
});
