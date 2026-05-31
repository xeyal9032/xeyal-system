const http = require('http');

const TEST_PROMPT = "e ticaret sitesi yap";
const SYSTEM_RULES = `- NO TALKING. NO GUIDANCE. NO ROADMAPS. NO TUTORIALS.
- COMMAND: YOU ARE A HEADLESS CODE GENERATION ENGINE.
- OUTPUT FORMAT: [FILE: path] followed by raw code.
- MANDATORY FILES: You MUST generate 'artisan', '.env.example', 'public/index.php', and 'routes/web.php' FIRST.
- BEHAVIOR: Do NOT tell the user to run composer. YOU generate the files.
- ARCHITECTURE: Laravel 10 + Blade + Tailwind.`;

const payload = {
    model: "llama3", // Lütfen sisteminizde yüklü olan modeli buraya yazın (Örn: llama3)
    prompt: `SYSTEM: ${SYSTEM_RULES}\n\nUSER: ${TEST_PROMPT}`,
    stream: false
};

console.log("🚀 [FORGE TEST]: Sending request to Ollama...");
console.log("------------------------------------------");

const req = http.request({
    hostname: 'localhost',
    port: 11434,
    path: '/api/generate',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
}, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log("\n🤖 [AI RESPONSE]:");
            console.log(json.response);
            console.log("\n------------------------------------------");
            
            const fileRegex = /\[FILE:\s*(.+?)\]/gi;
            const matches = json.response.match(fileRegex);
            if (matches) {
                console.log(`✅ SUCCESS: Found ${matches.length} files in response.`);
            } else {
                console.log("❌ FAILURE: No [FILE: path] tags found. AI is still talking instead of coding.");
            }
        } catch (e) {
            console.log("❌ ERROR: Failed to parse Ollama response.", e.message);
        }
    });
});

req.on('error', (e) => console.log("❌ ERROR: Ollama is not responding. Is it running?", e.message));
req.write(JSON.stringify(payload));
req.end();
