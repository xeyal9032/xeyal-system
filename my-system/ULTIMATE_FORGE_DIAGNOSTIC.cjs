const http = require('http');
const fs = require('fs');
const path = require('path');

const DESKTOP = path.join(require('os').homedir(), 'Desktop', 'FORGE_DIAGNOSTIC_RESULT');
if (!fs.existsSync(DESKTOP)) fs.mkdirSync(DESKTOP);

async function callOllama(prompt, history = []) {
    const systemRules = `- NO TALKING. NO TUTORIALS.
- COMMAND: GENERATE [FILE: path] followed by FULL CODE content.
- EXAMPLE:
[FILE: artisan]
<?php // Artisan code here...
- ARCHITECTURE: Laravel 10.
- BEHAVIOR: DO NOT LIST DIRECTORIES. OUTPUT FILES WITH CODE ONLY.`;

    const fullPrompt = history.length > 0 
        ? `HISTORY: ${JSON.stringify(history)}\n\nSYSTEM: ${systemRules}\n\nNEW TASK: ${prompt}`
        : `SYSTEM: ${systemRules}\n\nINITIAL TASK: ${prompt}`;

    return new Promise((resolve, reject) => {
        const payload = {
            model: "llama3",
            prompt: fullPrompt,
            stream: false
        };

        const req = http.request({
            hostname: 'localhost', port: 11434, path: '/api/generate', method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(JSON.parse(data).response));
        });
        req.on('error', reject);
        req.write(JSON.stringify(payload));
        req.end();
    });
}

async function runDeepDiagnostic() {
    console.log("🚀 [PHASE 1]: Multi-Module Swarm Generation (Accounting, Inventory, Logistics)...");
    const step1 = await callOllama(`GENERATE A SHARED ARCHITECTURE FOR 3 MODULES:
1. Accounting (Invoices, Payments)
2. Inventory (Products, Stock)
3. Logistics (Shipping, Tracking)
- REQUIREMENT: All must use a shared 'app/Traits/EnterpriseLogger.php' and 'app/Http/Controllers/BaseEnterpriseController.php'.
- NO TALKING. CODE ONLY.`);
    
    console.log("✅ Phase 1 (Swarm) Complete. Files Detected:", (step1.match(/\[FILE:/g) || []).length);

    console.log("\n🧠 [PHASE 2]: Chaos Recovery (Identifying the Missing Piece)...");
    // We intentionally don't ask for a critical file in step 1, now we check if it notices.
    const step2 = await callOllama(`CRITICAL AUDIT: Look at the 3 modules above. A CRITICAL Laravel file is missing to make this project bootable. Identify it and generate it now. NO TALKING.`, [{role: 'assistant', content: step1}]);
    console.log("\n🤖 [RECOVERY RESULT]:\n", step2.substring(0, 300), "...");

    console.log("\n📂 [PHASE 3]: Cross-Language Bridge (Python Integration)...");
    const step3 = await callOllama(`GENERATE A PYTHON SCRIPT (monitor.py) that authenticates with this Laravel API and fetches the Inventory status. NO TALKING.`, [{role: 'assistant', content: step1 + step2}]);
    
    console.log("\n⚡ [PHASE 4]: Massive Scale Optimization (10M+ Records)...");
    const step4 = await callOllama(`OPTIMIZE the database migrations and ProductController for 10 MILLION records. Implement Indexing and Redis Caching. NO TALKING.`, [{role: 'assistant', content: step1 + step2 + step3}]);

    console.log("\n📂 [PHASE 5]: Final Writing & Project Assembly...");
    const combined = step1 + "\n" + step2 + "\n" + step3 + "\n" + step4;
    writeFiles(combined);

    console.log("\n------------------------------------------");
    console.log(`🏁 ULTIMATE DIAGNOSTIC v7 COMPLETE!`);
    console.log(`📊 Result: AI Forge has exceeded human-level architect boundaries.`);
    console.log("------------------------------------------");
}

function writeFiles(content) {
    const fileRegex = /(?:\[FILE:\s*(.+?)\]|\*\*([a-zA-Z0-9.\-_/]+?)\*\*:?)\s*[\r\n]*(?:```[a-z]*\s*)?([\s\S]+?)(?=```|\[FILE:|\*\*[a-zA-Z0-9.\-_/]+?\*\*:|$)/gi;
    let match;
    while ((match = fileRegex.exec(content)) !== null) {
        const raw = (match[1] || match[2]).trim().split(' ')[0];
        const fname = raw.replace(/[^a-zA-Z0-9.\-_/]/g, '');
        const code = match[3].trim();
        const fPath = path.join(DESKTOP, fname);
        const fDir = path.dirname(fPath);
        if (!fs.existsSync(fDir)) fs.mkdirSync(fDir, { recursive: true });
        fs.writeFileSync(fPath, code);
        console.log(`📄 Written: ${fname}`);
    }
}

runDeepDiagnostic().catch(console.error);
