import express from 'express';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import si from 'systeminformation';
import { execSync } from 'child_process';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = __dirname;

const app = express();
const PORT = 9999;

app.use(express.json());

// Serve the UI
app.get('/', (req, res) => {
    res.sendFile(path.join(ROOT, 'SYSTEM_DEEP_ANALYSER_UI.html'));
});

// Deep Audit Endpoint
app.get('/api/audit', async (req, res) => {
    const report = {
        timestamp: new Date().toISOString(),
        core: await checkCoreIntegrity(),
        ai: await checkAIHealth(),
        network: await checkNetworkHealth(),
        system: await getSystemMetrics(),
        security: await checkSecuritySanity()
    };
    res.json(report);
});

async function checkCoreIntegrity() {
    const criticalFiles = [
        'cli/index.js',
        'desktop-app/src-tauri/src/lib.rs',
        'XEYAL_HEALER.cjs',
        'ULTIMATE_SYSTEM_PROBE.js',
        'main.js',
        'package.json',
        'FORGE_LIBRARY_TR.md'
    ];
    
    const results = [];
    for (const f of criticalFiles) {
        const exists = await fs.pathExists(path.join(ROOT, f));
        results.push({ name: f, status: exists ? 'OK' : 'MISSING', path: path.join(ROOT, f) });
    }
    return results;
}

async function checkAIHealth() {
    const results = { status: 'OFFLINE', models: [], latency: 0 };
    const start = Date.now();
    try {
        const response = await fetch('http://localhost:11434/api/tags');
        if (response.ok) {
            const data = await response.json();
            results.status = 'ONLINE';
            results.models = data.models || [];
            results.latency = Date.now() - start;
        }
    } catch (e) {
        results.error = e.message;
    }
    return results;
}

async function checkNetworkHealth() {
    const ports = [3000, 4000, 11434, 9999];
    const results = [];
    for (const p of ports) {
        const active = await isPortActive(p);
        results.push({ port: p, status: active ? 'ACTIVE' : 'IDLE' });
    }
    return results;
}

function isPortActive(port) {
    return new Promise((resolve) => {
        const server = http.createServer().listen(port, '127.0.0.1', () => {
            server.close();
            resolve(false);
        }).on('error', () => {
            resolve(true);
        });
    });
}

async function getSystemMetrics() {
    try {
        const cpu = await si.cpu();
        const mem = await si.mem();
        const os = await si.osInfo();
        return {
            cpu: `${cpu.manufacturer} ${cpu.brand}`,
            ram: `${(mem.total / 1024 / 1024 / 1024).toFixed(2)} GB`,
            os: `${os.distro} ${os.release}`,
            uptime: si.time().uptime
        };
    } catch (e) {
        return { error: 'Failed to fetch metrics' };
    }
}

async function checkSecuritySanity() {
    const files = await fs.readdir(ROOT);
    const suspicious = files.filter(f => f.endsWith('.pem') || f.endsWith('.key') || f.includes('secret'));
    return {
        suspiciousFiles: suspicious,
        status: suspicious.length === 0 ? 'SECURE' : 'WARNING'
    };
}

// Auto-Heal Trigger
app.post('/api/heal', async (req, res) => {
    try {
        const output = execSync(`node XEYAL_HEALER.cjs ${ROOT}`).toString();
        res.json({ success: true, output });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

app.listen(PORT, () => {
    console.log(`\n🚀 QUANTUM DEEP ANALYSER is running at http://localhost:${PORT}`);
    console.log(`📡 Analyzing Xeyal-System infrastructure...\n`);
});
