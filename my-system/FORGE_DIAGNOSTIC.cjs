const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const app = express();
const PORT = 9998;

app.use(express.json());
app.use(express.static(__dirname));

const SYSTEM_PATH = 'C:\\Users\\xeyal\\Desktop\\systemx\\my-system';

app.get('/api/diagnose', async (req, res) => {
    const report = {
        timestamp: new Date().toISOString(),
        environment: {
            ollama_status: 'OFFLINE',
            templates_found: 0,
            active_path: SYSTEM_PATH
        },
        forge_probes: [],
        arch_rules: {}
    };

    // 1. Check Ollama
    try {
        const ollamaRes = await fetch('http://127.0.0.1:11434/api/tags');
        if (ollamaRes.ok) {
            const data = await ollamaRes.json();
            report.environment.ollama_status = 'ONLINE';
            report.environment.models = data.models;
        }
    } catch (e) {
        report.forge_probes.push({ type: 'CRITICAL', msg: 'Ollama is not reachable on 11434' });
    }

    // 2. Scan Templates (The 21 files)
    try {
        const srcPath = path.join(SYSTEM_PATH, 'desktop-app', 'src');
        const files = await fs.readdir(srcPath);
        const templates = files.filter(f => f.startsWith('templates-'));
        report.environment.templates_found = templates.length;
        report.environment.template_files = templates;
    } catch (e) {
        report.forge_probes.push({ type: 'WARN', msg: 'Could not scan desktop-app/src directory' });
    }

    // 3. Read Laravel Arch Rule
    try {
        const templateJS = await fs.readFile(path.join(SYSTEM_PATH, 'desktop-app', 'src', 'templates.js'), 'utf8');
        const archMatch = templateJS.match(/window\.LARAVEL_ARCHITECTURE\s*=\s*`([\s\S]+?)`;/);
        report.arch_rules.laravel = archMatch ? archMatch[1] : 'NOT FOUND';
    } catch (e) {
        report.arch_rules.laravel = 'ERROR READING FILE';
    }

    // 4. Check for project write permissions
    try {
        const testPath = 'C:\\Users\\xeyal\\Desktop\\ai-generated-app';
        await fs.ensureDir(testPath);
        await fs.writeFile(path.join(testPath, '.write_test'), 'OK');
        report.environment.fs_write_permission = 'OK';
    } catch (e) {
        report.environment.fs_write_permission = 'FAILED: ' + e.message;
    }

    res.json(report);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'FORGE_DIAGNOSTIC_UI.html'));
});

app.listen(PORT, () => {
    console.log(`\n🧠 AI FORGE DIAGNOSTIC ENGINE ONLINE: http://localhost:${PORT}\n`);
});
