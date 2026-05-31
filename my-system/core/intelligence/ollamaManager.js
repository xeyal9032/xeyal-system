import { execSync, spawn } from 'child_process';
import logger from '../system/logger.js';
import chalk from 'chalk';

/**
 * Ollama Manager
 * Handles detection, background installation, and local LLM communication.
 */
class OllamaManager {
    constructor() {
        this.apiEndpoint = 'http://127.0.0.1:11434/api/chat';
        this.model = 'llama3';
        
        // 🎯 AGENT TO MODEL MAPPING
        this.agentMapping = {
            'openclaw': 'qwen2.5-coder:7b',
            'claude-local': 'codellama:7b',
            'codex-local': 'starcoder2:3b',
            'opencode': 'deepseek-coder:6.7b',
            'droid': 'stable-code',
            'pi': 'phi3:mini'
        };
    }

    /**
     * Check if Ollama is installed in the system.
     */
    isInstalled() {
        try {
            execSync('where ollama', { stdio: 'ignore' });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Silently install Ollama via winget.
     * Note: This usually triggers a UAC prompt on Windows.
     */
    async install() {
        return new Promise((resolve, reject) => {
            console.log(chalk.cyan('🚀 Initializing Local AI (Ollama) Installation...'));
            console.log(chalk.yellow('⚠️  Windows may ask for Administrator permission.'));

            const installer = spawn('winget', ['install', '--id', 'Ollama.Ollama', '--silent', '--accept-package-agreements', '--accept-source-agreements'], {
                shell: true,
                stdio: 'inherit'
            });

            installer.on('close', (code) => {
                if (code === 0) {
                    console.log(chalk.green('✅ Ollama installation initiated successfully.'));
                    logger.info('Ollama installed via winget.');
                    resolve(true);
                } else {
                    console.error(chalk.red('❌ Ollama installation failed or was cancelled.'));
                    logger.error(`Ollama install failed with code ${code}`);
                    reject(new Error(`Exit code ${code}`));
                }
            });
        });
    }

    /**
     * Ensure the Llama3 model is pulled and ready.
     */
    async ensureModel() {
        console.log(chalk.blue(`🧠 Checking AI Model: ${this.model}...`));
        return new Promise((resolve, reject) => {
            const puller = spawn('ollama', ['pull', this.model], { stdio: 'inherit', shell: true });
            puller.on('close', (code) => {
                if (code === 0) {
                    console.log(chalk.green(`✅ Model ${this.model} is ready.`));
                    resolve(true);
                } else {
                    reject(new Error(`Failed to pull model ${this.model}`));
                }
            });
        });
    }

    /**
     * Analyze an error message using the local AI.
     */
    async analyzeError(errorMessage) {
        try {
            const prompt = `You are an expert developer assistant for "Xeyal-System". 
Analyze this terminal error and provide a concise, 1-2 sentence solution for a human developer.
Error: "${errorMessage}"
Format: "Reason: [reason]. Solution: [solution]."`;

            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: this.model,
                    prompt: prompt,
                    stream: false
                })
            });

            if (!response.ok) throw new Error(`Ollama API error: ${response.statusText}`);

            const data = await response.json();
            return data.response.trim();
        } catch (error) {
            logger.warn(`AI analysis failed: ${error.message}`);
            return null;
        }
    }

    async startServer() {
        try {
            // Check if already running
            const res = await fetch('http://127.0.0.1:11434/api/tags').catch(() => null);
            if (res && res.ok) return true;

            console.log(chalk.gray('🔄 Starting local AI server...'));
            spawn('ollama', ['serve'], {
                detached: true,
                stdio: 'ignore',
                shell: true
            }).unref();
            
            // Wait a few seconds for it to boot
            await new Promise(r => setTimeout(r, 3000));
            return true;
        } catch (error) {
            logger.error(`Failed to start Ollama server: ${error.message}`);
            return false;
        }
    }

    /**
     * Forge Chat: Specialized for code generation and project management.
     */
    async forgeChat(prompt, activeModel = 'llama3') {
        const tryFetch = async (messages) => {
             return await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: activeModel.toLowerCase(),
                    messages: messages,
                    stream: false,
                    options: {
                        temperature: 0.1,
                        top_p: 0.1,
                        num_predict: 4096
                    }
                })
            });
        };

        try {
            // 🎯 INTELLIGENCE ROUTING (Smart Detection)
            let isAgent = activeModel.startsWith('agent:');
            let agentId = isAgent ? activeModel.split(':')[1] : activeModel.toLowerCase();

            // If it's not explicitly an agent, check if it's in Ollama list
            if (!isAgent) {
                const localModels = await this.listModels();
                const modelExists = localModels.some(m => m.toLowerCase().startsWith(agentId));
                
                // If not in Ollama but we want to try it as an agent (like 'openclaw')
                if (!modelExists && (agentId === 'openclaw' || agentId === 'crestodian')) {
                    isAgent = true;
                }
            }

            if (isAgent) {
                const agentResponse = await this.routeToAgent(agentId, prompt);
                if (agentResponse) return agentResponse;
                logger.info(`Agent ${agentId} failed or returned empty. Falling back to default model.`);
            }

            // 🔄 STRIP ALL POSSIBLE PREFIXES (agent:, model:, intel:)
            let cleanModel = activeModel.toLowerCase();
            const prefixes = ['agent:', 'model:', 'intel:'];
            prefixes.forEach(p => {
                if (cleanModel.startsWith(p)) cleanModel = cleanModel.replace(p, '');
            });
            
            // 🔄 TRANSLATE AGENT NAME TO ACTUAL OLLAMA MODEL
            const mappedModel = this.agentMapping[cleanModel];
            if (mappedModel) {
                logger.info(`Translating Agent [${activeModel}] -> [${cleanModel}] -> Model [${mappedModel}]`);
                cleanModel = mappedModel;
            } else {
                // If not in mapping, just use the stripped name
                logger.info(`Using direct model name: [${cleanModel}]`);
            }

            // Check if model exists, if not pull it
            const models = await this.listModels();
            if (!models.some(m => m.toLowerCase().startsWith(cleanModel.toLowerCase()))) {
               logger.info(`Model ${cleanModel} not found. Pulling...`);
               await this.ensureModel(cleanModel);
            }

            let messages = [];
            try {
                messages = JSON.parse(prompt);
            } catch {
                // Fallback for simple string prompts
                messages = [
                    { 
                        role: 'system', 
                        content: `You are a professional full-stack engineer. 
COMMAND: GENERATE PRODUCTION-READY CODE.
RULES:
1. IDENTITY: You are an autonomous software architect. 
2. NO CONVERSATION: Start your response IMMEDIATELY with the first [FILE: path] tag.
3. ARCHITECTURE: Respect the user's chosen stack (Laravel, Express, etc.). If Laravel is chosen, prioritize public/index.php and artisan.
4. UI INTERACTIVITY: Ensure all generated frontend code is functional and premium.
5. CLEAN CODE: No inline styles. Mandatory A11Y labels.
6. OUTPUT RULE: Generate ONLY raw source code using [FILE: path] tags. No explanations.` 
                    },
                    { role: 'user', content: prompt }
                ];
            }

            let response;
            try {
                response = await tryFetch(messages);
            } catch (initialErr) {
                logger.info('Ollama not responding, attempting auto-start...');
                const started = await this.startServer();
                if (started) {
                    response = await tryFetch(messages);
                } else {
                    throw initialErr;
                }
            }

            if (!response.ok) {
                if (response.status === 404 && activeModel !== 'llama3') {
                    logger.warn(`Model ${activeModel} not found on Ollama. Retrying with llama3...`);
                    return await this.forgeChat(prompt, 'llama3');
                }
                throw new Error(`Ollama API error: ${response.statusText}`);
            }

            const data = await response.json();
            return data.message.content.trim();
        } catch (error) {
            logger.warn(`Forge AI chat failed: ${error.message}. Trying Gemini fallback...`);
            // ── Gemini API Fallback ──────────────────────────────────
            try {
                return await this.forgeWithGemini(prompt);
            } catch (geminiErr) {
                logger.warn(`Gemini fallback also failed: ${geminiErr.message}`);
                return `❌ AI Communication Error: ${error.message}. Is Ollama running?`;
            }
        }
    }

    /**
     * Gemini API Fallback — for when Ollama is not available or too slow.
     * Uses gemini-2.0-flash model with hardened code-generation prompt.
     */
    async forgeWithGemini(prompt) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) throw new Error('GEMINI_API_KEY not set in environment.');

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        let messages = [];
        try { messages = JSON.parse(prompt); } catch { messages = [{ role: 'user', content: prompt }]; }

        const systemMsg = messages.find(m => m.role === 'system')?.content || '';
        const userMsg   = messages.find(m => m.role === 'user')?.content   || prompt;

        const body = {
            contents: [{
                parts: [{
                    text: `${systemMsg}\n\nUser Request: ${userMsg}`
                }]
            }],
            systemInstruction: {
                parts: [{
                    text: `You are the Xeyal Forge AI Autopilot.
RULES (non-negotiable):
1. Output ONLY file blocks. No chat, no explanations.
2. Use this format for EVERY file:
[FILE: filename.ext]
\`\`\`
... full source code ...
\`\`\`
3. Generate ALL required files (index.html, style.css, game.js / app.js).
4. Code must be 100% complete and functional. NO placeholders.
5. Use premium dark-mode designs with modern CSS.
6. For games: grid-based engine, WASD+Arrow controls, score system.`
                }]
            },
            generationConfig: { temperature: 0.4, maxOutputTokens: 8192 }
        };

        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(90000)
        });

        if (!res.ok) throw new Error(`Gemini API error: ${res.status} ${res.statusText}`);
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error('Gemini returned empty response.');
        logger.info('✅ Gemini API responded successfully.');
        return text.trim();
    }

    /**
     * Route a prompt to a specialized agent from the Skills Hub.
     */
    async routeToAgent(agentId, prompt) {
        logger.info(`Routing Forge Request to Agent: ${agentId}`);
        
        try {
            // Check if command exists
            const { execSync } = await import('child_process');
            let commandFound = false;
            try {
                const cmd = process.platform === 'win32' ? `where ${agentId}` : `which ${agentId}`;
                execSync(cmd, { stdio: 'ignore' });
                commandFound = true;
            } catch {
                // Command not found on PATH
                commandFound = false;
            }

            if (!commandFound) {
                logger.warn(`Agent [${agentId}] not found on PATH. Falling back to specialized LLM mode.`);
                
                // FALLBACK: Use standard Forge logic but with high-expertise prompt
                const fallbackSystemPrompt = `You are the Xeyal Forge AI acting as a Specialized ${agentId.toUpperCase()} Expert. 
                Your task is to generate complete, high-quality code. 
                Follow all standard Forge rules: [FILE: path] tags, no placeholders, full logic.`;
                
                const messages = [
                    { role: 'system', content: fallbackSystemPrompt },
                    { role: 'user', content: prompt }
                ];
                return await this.forgeChat(JSON.stringify(messages), 'llama3');
            }

            const systemPrompt = `[SYSTEM: You are an expert builder. Output source code using [FILE: path] tags ONLY. No chat.] `;
            const fullPrompt = `${systemPrompt} ${prompt}`;

            return new Promise((resolve, reject) => {
                const child = spawn(agentId, [], { 
                    shell: true,
                    stdio: ['pipe', 'pipe', 'pipe'] 
                });

                // Write the full prompt to the agent's stdin
                child.stdin.write(fullPrompt);
                child.stdin.end();

                let output = '';
                let errorOutput = '';

                const timeout = setTimeout(() => {
                    child.kill();
                    reject(new Error(`Agent ${agentId} timed out after 120 seconds.`));
                }, 120000);

                child.stdout.on('data', (data) => { output += data.toString(); });
                child.stderr.on('data', (data) => { errorOutput += data.toString(); });

                child.on('close', (code) => {
                    clearTimeout(timeout);
                    if (code === 0) {
                        resolve(output.trim());
                    } else {
                        // If agent fails, don't just crash, log it and return null so fallback kicks in
                        logger.error(`Agent ${agentId} failed (Code ${code}): ${errorOutput}`);
                        resolve(null); 
                    }
                });
            });
        } catch (err) {
            logger.warn(`Agent routing failed: ${err.message}. Falling back to standard LLM.`);
            return null;
        }
    }

    /**
     * Enhanced model assurance that can specify a model.
     */
    async ensureModel(modelName = 'llama3') {
        console.log(chalk.blue(`🧠 Checking AI Model: ${modelName}...`));
        return new Promise((resolve) => {
            const puller = spawn('ollama', ['pull', modelName], { stdio: 'inherit', shell: true });
            puller.on('close', (code) => {
                if (code === 0) {
                    console.log(chalk.green(`✅ Model ${modelName} is ready.`));
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    /**
     * List locally available models.
     */
    async listModels() {
        try {
            const res = await fetch('http://localhost:11434/api/tags');
            if (res.ok) {
                const data = await res.json();
                return data.models.map(m => m.name);
            }
            return [];
        } catch {
            return [];
        }
    }
}

const ollamaManager = new OllamaManager();
export default ollamaManager;
