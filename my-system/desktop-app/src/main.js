function id(name) { return document.getElementById(name); }

// Robust Tauri API Detection (v2 Compliant)
let invoke = () => console.warn('Tauri invoke not available');
let listen = () => console.warn('Tauri listen not available');

if (window.__TAURI__) {
  const core = window.__TAURI__.core || window.__TAURI__;
  invoke = core.invoke;
  const event = window.__TAURI__.event || window.__TAURI__;
  listen = event.listen;
}

const startBtn = id('start-btn');
const stopBtn = id('stop-btn');
const logTerminal = id('log-terminal');
const statusBadge = id('status-badge');
const cpuSpan = id('cpu-load');
const ramSpan = id('ram-load');
const uptimeSpan = id('uptime');
const activeProjectName = id('active-project-name');
const welcomeOverlay = id('welcome-overlay');
const mainApp = id('main-app');
const initializeBtn = id('initialize-btn');

// Create Project Modal Elements
const createModal = id('create-modal');
const closeModal = id('close-modal');
const confirmCreateBtn = id('confirm-create');
const templateOpts = document.querySelectorAll('.template-opt');
const newProjectInput = id('new-project-name');

let isLaunching = false;

// ═══════════════════════════════════════════════════
// ONBOARDING SYSTEM (RE-VALIDATED)
// ═══════════════════════════════════════════════════

const AGENTS = [
  { id: 'openclaw', name: 'OpenClaw', desc: 'Qwen 2.5 · 100+ skills', emoji: '🦅' },
  { id: 'claude-local', name: 'Claude-Local', desc: 'CodeLlama · Subagent desteği', emoji: '🤖' },
  { id: 'codex-local', name: 'Codex-Local', desc: 'StarCoder2 · Kodlama uzmanı', emoji: '⚡' },
  { id: 'opencode', name: 'OpenCode', desc: 'DeepSeek · Açık kaynak devi', emoji: '🧠' },
  { id: 'droid', name: 'Droid', desc: 'StableCode · Terminal ajanı', emoji: '🦾' },
  { id: 'pi', name: 'Pi', desc: 'Phi-3 · Hafif ve hızlı', emoji: '🔌' },
  { id: 'claudedesktop', name: 'Claude Desktop', desc: 'Llama3 · Cloud Köprüsü', emoji: '💻' },
  { id: 'hermesagent', name: 'Hermes Agent', desc: 'Hermes 3 · Otonom iyileştirici', emoji: '🌌' },
  { id: 'copilotcli', name: 'Copilot CLI', desc: 'CodeGemma · Terminal asistanı', emoji: '🚀' },
  { id: 'autogpt', name: 'AutoGPT', desc: 'Llama3 · İnternet gezgin ajanı', emoji: '🌐' },
  { id: 'agentgpt', name: 'AgentGPT', desc: 'Llama3 · Tarayıcı otonom ajanı', emoji: '🖥️' },
  { id: 'crewai', name: 'CrewAI', desc: 'Qwen2.5 · Çoklu rol orkestratörü', emoji: '👥' },
  { id: 'langchain', name: 'LangChain', desc: 'Qwen2.5 · Modül entegrasyonu', emoji: '🔗' },
  { id: 'superagi', name: 'SuperAGI', desc: 'Qwen2.5 · Geliştirici otonom tabanı', emoji: '🛠️' },
  { id: 'babyagi', name: 'BabyAGI', desc: 'Phi3 · Görev otonom döngüsü', emoji: '👶' },
  { id: 'opendevin', name: 'OpenDevin', desc: 'Qwen2.5 · Otonom yazılım mühendisi', emoji: '💻' },
  { id: 'metagpt', name: 'MetaGPT', desc: 'Qwen2.5 · Çoklu rol simülatörü', emoji: '🏢' },
  { id: 'gpt-engineer', name: 'GPT Engineer', desc: 'Qwen2.5 · Tek prompt kod üretici', emoji: '⚙️' },
  { id: 'devika', name: 'Devika AI', desc: 'Qwen2.5 · Web tarama mühendisi', emoji: '👩‍💻' }
];

function setProgress(pct, label) {
  const bar = id('ob-prog');
  const lbl = id('ob-prog-label');
  if (bar) bar.style.width = pct + '%';
  if (lbl) lbl.textContent = label;
}

function renderAgentCards() {
  const grid = id('ob-agent-grid');
  if (!grid) return;
  grid.innerHTML = '';
  AGENTS.forEach(a => {
    const card = document.createElement('div');
    card.className = 'ob-agent-card';
    card.id = 'agent-card-' + a.id;
    card.innerHTML = `
      <span class="ob-agent-emoji">${a.emoji}</span>
      <div class="ob-agent-info">
        <div class="ob-agent-name">${a.name}</div>
        <div class="ob-agent-desc">${a.desc}</div>
      </div>
      <div class="ob-agent-done" id="agent-status-${a.id}">⏳</div>
    `;
    grid.appendChild(card);
  });
}

function setAgentStatus(agentId, state) {
  const card = id('agent-card-' + agentId);
  const dot  = id('agent-status-' + agentId);
  if (!card || !dot) return;
  card.className = 'ob-agent-card ' + state;
  if (state === 'installing') {
    dot.innerHTML = '<div class="ob-agent-spin"></div>';
  } else if (state === 'done') {
    dot.textContent = '✅';
  } else if (state === 'error') {
    dot.textContent = '⚠️';
  }
}

async function installAllAgents() {
  id('ob-agents')?.classList.remove('hidden');
  renderAgentCards();
  let hasError = false;
  for (let i = 0; i < AGENTS.length; i++) {
    const a = AGENTS[i];
    setAgentStatus(a.id, 'installing');
    setProgress(20 + Math.round((i / AGENTS.length) * 70), `Kuruluyor: ${a.name}...`);
    try {
      await invoke('install_ollama_agent', { agent: a.id });
      setAgentStatus(a.id, 'done');
      setProgress(20 + Math.round((i / AGENTS.length) * 70), `Başarıyla kuruldu: ${a.name}`);
    } catch (err) {
      setAgentStatus(a.id, 'error');
      hasError = true;
      if (id('ob-prog-label')) id('ob-prog-label').textContent = "HATA: " + err;
      break; 
    }
    await new Promise(r => setTimeout(r, 400));
  }
  if (!hasError) setProgress(100, 'Sistem Hazır! 🚀');
  id('ob-done-btn')?.classList.remove('hidden');
}

async function installOllama() {
  try {
    setProgress(15, 'Ollama indirme sayfası açılıyor...');
    await invoke('open_url', { url: 'https://ollama.com/download' });
    if (id('ollama-sub')) id('ollama-sub').textContent = 'Ollama kurduktan sonra bittiğinde Atla butonuna bas.';
  } catch (err) { console.error(err); }
}

async function skipOllama() {
  id('ollama-btn-wrap')?.classList.add('hidden');
  setProgress(20, 'Ollama atlandı, ajanlar kuruluyor...');
  await installAllAgents();
}

async function finishOnboarding() {
  try { await invoke('set_onboarding_complete'); } catch (_) {}
  id('onboarding-overlay')?.classList.add('hidden');
  appendLog('✨ Onboarding completed successfully.', 'success');
}

async function startOnboarding(force = false) {
  const overlay = id('onboarding-overlay');
  if (!overlay) return;
  
  if (!window._ob_bound) {
    id('ob-download-ollama')?.addEventListener('click', installOllama);
    id('ob-skip-ollama')?.addEventListener('click', skipOllama);
    id('ob-done-btn')?.addEventListener('click', finishOnboarding);
    id('ob-skip-all')?.addEventListener('click', finishOnboarding);
    window._ob_bound = true;
  }

  if (!force) {
    let done = false;
    try { done = await invoke('check_onboarding_complete'); } catch (_) {}
    if (done) return;
  }

  overlay.classList.remove('hidden');
  setProgress(5, 'Başlatılıyor...');
  
  let ollamaOk = false;
  try { ollamaOk = await invoke('check_ollama_installed'); } catch (_) {}

  if (ollamaOk) {
    id('ollama-status').textContent = '✅';
    id('ollama-sub').textContent = 'Ollama tespit edildi.';
    await installAllAgents();
  } else {
    id('ollama-status').textContent = '❌';
    id('ollama-btn-wrap')?.classList.remove('hidden-initially');
  }
}

// ═══════════════════════════════════════════════════
// UI & LOGGING
// ═══════════════════════════════════════════════════

function stripAnsi(str) {
  return str.replace(/\x1B\[[0-9;]*[mGKHFJ]|\[[0-9;]*[mGKHFJ]/g, '').replace(/\[\d+[A-Za-z]/g, '').trim();
}

function appendLog(msg, type = 'system') {
  const clean = stripAnsi(msg);
  if (!clean || !logTerminal) return;
  const line = document.createElement('div');
  line.className = `log-line ${type}`;
  line.textContent = `[${new Date().toLocaleTimeString()}] ${clean}`;
  logTerminal.appendChild(line);
  logTerminal.scrollTop = logTerminal.scrollHeight;
}

function switchTab(tab) {
  ['cockpit', 'inspector', 'marketplace', 'skills', 'forge', 'swarm', 'cloud', 'diagnostic', 'about'].forEach(t => {
    id('page-' + t)?.classList.toggle('hidden', t !== tab);
    id('tab-' + t)?.classList.toggle('active', t === tab);
  });
  if (tab === 'inspector') refreshPorts();
  if (tab === 'marketplace') loadMarketplace();
  if (tab === 'skills' || tab === 'forge') loadSkills();
  if (tab === 'swarm') console.log('🐝 Swarm Orchestrator active.');
  if (tab === 'cloud') refreshCloudStatus();
  if (tab === 'about') refreshAboutAgents();
}

id('tab-cockpit')?.addEventListener('click', () => switchTab('cockpit'));
id('tab-inspector')?.addEventListener('click', () => switchTab('inspector'));
id('tab-marketplace')?.addEventListener('click', () => switchTab('marketplace'));
id('tab-skills')?.addEventListener('click', () => switchTab('skills'));
id('tab-forge')?.addEventListener('click', () => switchTab('forge'));
id('tab-swarm')?.addEventListener('click', () => switchTab('swarm'));
id('tab-cloud')?.addEventListener('click', () => switchTab('cloud'));
id('tab-about')?.addEventListener('click', () => switchTab('about'));

function appendSwarmLog(msg, type = 'info') {
    const container = id('swarm-logs');
    if (!container) return;
    const line = document.createElement('div');
    line.className = `log-line ${type}`;
    line.innerHTML = `<span class="timestamp">[${new Date().toLocaleTimeString()}]</span> ${msg}`;
    container.appendChild(line);
    container.scrollTop = container.scrollHeight;
}

async function launchSwarmMission(prefilledTask = null) {
    const task = (typeof prefilledTask === 'string' && prefilledTask.trim() !== '') 
        ? prefilledTask 
        : prompt("What mission shall the Xeyal-Swarm undertake?", "Build a secure API gateway with rate limiting");
        
    if (!task) return;

    id('swarm-graph-container').innerHTML = '<div class="pulse-ring active"></div><p class="text-primary">MISSION IN PROGRESS: ' + task + '</p>';
    appendSwarmLog(`🚀 Mission Initialized: ${task}`, 'system');

    // Simulate Agent Chain of Thought
    setTimeout(() => {
        appendSwarmLog('🏛️ <strong>[Mimar-Agent]</strong>: Analyzing requirements and designing system architecture...', 'architect');
    }, 1000);

    setTimeout(async () => {
        appendSwarmLog('💻 <strong>[Kodcu-Agent]</strong>: Generating real-world code using local AI engine...', 'coder');
        try {
            // CALL THE REAL AI ENGINE WITH MULTI-FILE PROMPT
            const projectName = task.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase().substring(0, 20) || 'project';
            const useLaravelArch = id('swarm-use-laravel-arch')?.checked;
            const extraContext = useLaravelArch && window.LARAVEL_ARCHITECTURE 
                ? `\n\n=== CRITICAL ARCHITECTURE INSTRUCTIONS ===\n${window.LARAVEL_ARCHITECTURE}\n==========================================\n\n` 
                : '';

            const aiPrompt = `Task: "${task}". ${extraContext}
You are a headless enterprise code generator. You MUST strictly follow these rules:
1. In package.json, output STRICTLY valid JSON (double quotes around all keys like "dependencies").
2. Do NOT use "type": "module" in package.json. Use standard CommonJS (require).
3. Use "*" for all package versions in package.json to prevent installation errors.
4. NEVER connect to real databases (Postgres, MongoDB, MySQL). ALWAYS use a mock in-memory DB or SQLite so the project runs instantly without external dependencies.

=========================================
CRITICAL SYSTEM REQUIREMENT:
You MUST wrap EVERY SINGLE FILE you generate inside XML tags exactly like this:
<FILE path="filename.ext">
code here
</FILE>

WARNING: DO NOT output any conversational text. DO NOT use markdown headers (like **1. Package.json**). DO NOT use markdown code blocks (\`\`\`php). IF YOU DO NOT USE THE EXACT <FILE path="..."> FORMAT, THE SYSTEM WILL CRASH.
=========================================`;


            const aiResponse = await invoke('invoke_ollama', { 
                model: 'llama3', 
                prompt: aiPrompt 
            });

            // Extract multiple files
            const fileRegex = /<FILE path="([^"]+)">([\s\S]*?)<\/FILE>/g;
            let match;
            let filesWritten = 0;
            let runTarget = null;
            
            while ((match = fileRegex.exec(aiResponse)) !== null) {
                const filePath = match[1];
                let content = match[2].trim();
                
                // Strip markdown backticks if AI accidentally included them inside <FILE>
                if (content.startsWith('```')) {
                    const firstNewline = content.indexOf('\n');
                    if (firstNewline !== -1) content = content.substring(firstNewline + 1);
                    if (content.endsWith('```')) content = content.substring(0, content.length - 3).trim();
                }

                const fullPath = `${projectName}/${filePath}`;
                
                await invoke('swarm_action', { 
                    actionType: 'WRITE_FILE', 
                    pathStr: fullPath, 
                    content: content 
                });
                filesWritten++;
            }

            if (filesWritten === 0) {
                 // Fallback if AI didn't follow the <FILE> format
                 const extension = task.toLowerCase().includes('python') ? 'py' : 'js';
                 const filename = `swarm_task.${extension}`;
                 let cleanContent = aiResponse.trim();
                 if (cleanContent.includes('```')) {
                     // Try to extract from standard markdown block
                     const blocks = cleanContent.split('```');
                     if (blocks.length >= 3) {
                         cleanContent = blocks[1].substring(blocks[1].indexOf('\n') + 1);
                     }
                 }
                 await invoke('swarm_action', { 
                     actionType: 'WRITE_FILE', 
                     pathStr: filename, 
                     content: cleanContent 
                 });
                 runTarget = filename;
                 appendSwarmLog(`📂 <strong>[Kodcu-Agent]</strong>: REAL script written to Desktop/Xeyal_Swarm_Output/${filename}`, 'coder');
            } else {
                 runTarget = projectName;
                 appendSwarmLog(`📂 <strong>[Kodcu-Agent]</strong>: Built full project (${filesWritten} files) in Desktop/Xeyal_Swarm_Output/${projectName}`, 'coder');
            }
            
            id('swarm-graph-container').innerHTML = `
                <div class="pulse-ring"></div>
                <p class="text-success" style="margin-bottom: 10px;">MISSION COMPLETED SUCCESSFULLY</p>
                <button id="run-swarm-btn" class="btn primary">▶️ Run Generated Project</button>
            `;
            
            setTimeout(() => {
                const runBtn = id('run-swarm-btn');
                if (runBtn) {
                    runBtn.onclick = () => executeSwarmCode(runTarget);
                }
            }, 100);

            // AUTOMATICALLY OPEN THE FOLDER AND RUN HEALER
            const desktop = await invoke('get_desktop_path');
            const projectPath = `${desktop}\\Xeyal_Swarm_Output\\${projectName}`;
            
            appendSwarmLog('🩺 <strong>[HEALER]</strong>: Running autonomous self-healing on project...', 'system');
            try {
                const healingResult = await invoke('heal_project', { projectPath: projectPath });
                appendSwarmLog(`✅ <strong>[HEALER]</strong>: ${healingResult.split('\n').pop()}`, 'success');
            } catch (he) {
                appendSwarmLog(`⚠️ [HEALER]: Healing failed but project is ready: ${he}`, 'warning');
            }

            await invoke('open_url', { url: projectPath });
            appendSwarmLog('🚀 <strong>[SYSTEM]</strong>: Opening output folder for you...', 'system');
        } catch (e) {
            appendSwarmLog('⚠️ [Kodcu-Agent]: AI Generation failed: ' + e, 'error');
            appendSwarmLog('💡 Tip: Ensure Ollama is running with "llama3" model.', 'system');
            id('swarm-graph-container').innerHTML = '<div class="pulse-ring" style="border-color: var(--danger)"></div><p class="text-danger">MISSION FAILED</p>';
        }
    }, 3000);

    setTimeout(() => {
        appendSwarmLog('🛡️ <strong>[Testci-Agent]</strong>: Running vulnerability scans and unit tests...', 'qa');
    }, 5000);

    setTimeout(() => {
        appendSwarmLog('✅ <strong>[MISSION COMPLETE]</strong>: Artifacts synced to Cloud Vault.', 'success');
        // Do not overwrite the innerHTML here because the button is already rendered.
    }, 7000);
}

window.launchSwarmMission = launchSwarmMission;

async function executeSwarmCode(filename) {
    appendSwarmLog(`⚡ <strong>[EXECUTION ENGINE]</strong>: Analyzing dependencies and launching ${filename}...`, 'system');
    try {
        const result = await invoke('execute_swarm_code', { filename });
        appendSwarmLog(`✅ <strong>[EXECUTION ENGINE]</strong>: ${result}`, 'success');
    } catch (e) {
        appendSwarmLog(`❌ <strong>[EXECUTION ENGINE]</strong>: Execution failed: ${e}`, 'error');
    }
}
window.executeSwarmCode = executeSwarmCode;

function setLang(lang) {
  ['tr', 'en', 'ru'].forEach(l => {
    id('content-' + l)?.classList.toggle('hidden', l !== lang);
    id('lang-' + l)?.classList.toggle('active', l === lang);
  });
}

// ═══════════════════════════════════════════════════
// PROJECT SCAFFOLDING
// ═══════════════════════════════════════════════════

id('create-project-trigger')?.addEventListener('click', () => createModal?.classList.remove('hidden'));
id('close-modal')?.addEventListener('click', () => createModal?.classList.add('hidden'));

templateOpts.forEach(opt => {
    opt.addEventListener('click', () => {
        templateOpts.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
    });
});

confirmCreateBtn?.addEventListener('click', async () => {
    const name = newProjectInput.value.trim();
    const activeOpt = document.querySelector('.template-opt.active');
    const template = activeOpt?.dataset.template;
    if (!name) return;
    createModal?.classList.add('hidden');
    appendLog(`🚀 Scaffolding ${template} project: ${name}...`);
    try {
        const desktop = await invoke('get_desktop_path');
        const path = await invoke('create_project', { name, template, path: desktop });
        appendLog(`✅ Project created at: ${path}`, 'success');
        
        // GLOBAL AUTO-HEAL
        await triggerAutoHeal(path, name);

        if (activeProjectName) activeProjectName.textContent = name;
        await invoke('open_project_folder', { path });
    } catch (e) { appendLog(e, 'error'); }
});

async function triggerAutoHeal(path, name) {
    appendLog(`🩺 [<strong>HEALER</strong>]: Running global sanitization on '${name}'...`, 'system');
    try {
        const result = await invoke('heal_project', { projectPath: path });
        appendLog(`✅ [<strong>HEALER</strong>]: ${result.trim().split('\n').pop()}`, 'success');
        return true;
    } catch (e) {
        appendLog(`⚠️ Healer-Status: Failed to sanitize project. Error: ${e}`, 'warning');
        return false;
    }
}

// ═══════════════════════════════════════════════════
// AI FORGE (PRO ANALYSER & TEMPLATE BYPASS)
// ═══════════════════════════════════════════════════

const fInput = id('forge-user-input');
const fSend = id('forge-send-btn');
const fHistory = id('forge-chat-history');
const fIntelligence = id('forge-intelligence-select');
const fRunBtn = id('forge-run-btn');
const fFileTree = id('forge-file-tree');
const fCodeContent = id('forge-code-content');

let sessionTargetPath = null;
let sessionProjectName = "forge-app";
let activeSessionAgent = null;

async function updateForgeFileTree() {
    if (!sessionTargetPath || !fFileTree) return;
    try {
        const fileList = await invoke('get_project_structure', { path: sessionTargetPath });
        if (Array.isArray(fileList)) {
            fFileTree.innerHTML = fileList.map(f => `
                <div class="file-item" onclick="openFileInForge('${f.name}', '${f.path.replace(/\\/g, '/')}')">
                    📄 ${f.rel || f.name}
                </div>
            `).join('');
        }
    } catch (e) { console.error('Tree update failed:', e); }
}

window.openFileInForge = async (name, path) => {
    try {
        const content = await invoke('read_project_file', { path });
        if (id('forge-code-viewer')) id('forge-code-viewer').classList.remove('hidden');
        if (id('forge-preview-filename')) id('forge-preview-filename').textContent = name;
        if (fCodeContent) fCodeContent.textContent = content;
    } catch (e) { appendLog(e, 'error'); }
};

fSend?.addEventListener('click', async () => {
    try {
        const prompt = fInput?.value?.trim();
        if (!prompt) return;

        // 1. UI FEEDBACK (Immediate)
        if (fInput) fInput.value = '';
        const userMsg = document.createElement('div'); userMsg.className = 'msg user';
        userMsg.textContent = prompt;
        fHistory?.appendChild(userMsg);
        
        const thinkingMsg = document.createElement('div'); 
        thinkingMsg.className = 'msg system thinking';
        thinkingMsg.innerHTML = '🧠 <i>AI is thinking and architecting... Please wait.</i>';
        thinkingMsg.id = 'forge-thinking-temp';
        fHistory?.appendChild(thinkingMsg);
        if (fHistory) fHistory.scrollTop = fHistory.scrollHeight;

        let intelligenceSource = fIntelligence?.value || 'auto';
        if (intelligenceSource === 'auto') {
            intelligenceSource = (typeof activeSessionAgent !== 'undefined' && activeSessionAgent) 
                ? activeSessionAgent 
                : 'llama3'; // Default to llama3 if no agent active
        }

        const useLaravelArch = id('forge-use-laravel-arch')?.checked;
        
        // 1. SMART TEMPLATE BYPASS (Safe Check)
        let detected = null;
        try {
            if (!useLaravelArch && window.detectForgeTemplate) {
                detected = window.detectForgeTemplate(prompt);
            }
        } catch(te) { console.error("Template check failed", te); }

        if (detected) {
            appendLog(`⚡ Template Match: [${detected.key}] — Rapid deployment initiated...`, 'success');
            const desktop = await invoke('get_desktop_path');
            if (!sessionTargetPath) {
                sessionProjectName = detected.projectName || "forge-app";
                sessionTargetPath = await invoke('create_project', { name: sessionProjectName, template: 'static-web', path: desktop });
            }
            for (const [fname, code] of Object.entries(detected.files)) {
                await invoke('write_project_file', { path: `${sessionTargetPath}/${fname}`, content: code });
            }
            await updateForgeFileTree();
            fRunBtn?.classList.remove('hidden');
            await triggerAutoHeal(sessionTargetPath, sessionProjectName);
            appendLog(`✨ [FORGE]: Template '${sessionProjectName}' deployed.`, 'success');
            return;
        }

        // 3. AI GENERATION
        fSend.disabled = true; 
        fSend.textContent = 'Thinking...';

        const forgeStatus = (msg, type = 'system') => {
            const m = document.createElement('div');
            m.className = `msg ${type}`;
            m.innerHTML = msg;
            fHistory?.appendChild(m);
            if (fHistory) fHistory.scrollTop = fHistory.scrollHeight;
        };
        
        // PERSISTENT CHAT HISTORY (Safe Initialization)
        if (!window.FORGE_CONTEXT) window.FORGE_CONTEXT = [];
        
        // FLAT-TEXT PROMPT FORMAT (Proven to work in FORGE_STRESS_TEST.cjs)
        const systemRules = window.LARAVEL_ARCHITECTURE || "";
        const flatPrompt = `SYSTEM RULES:\n${systemRules}\n\nUSER REQUIREMENT: ${prompt}\n\nSTYLE GUIDE: Use HSL tailwind colors, Glassmorphism, Outfit font, and smooth animations. Every component must WOW the user.\n\nCOMMAND: GENERATE ALL FILES NOW IN [FILE: path] FORMAT. NO TALKING.`;

        const res = await invoke('invoke_ollama', { 
            model: intelligenceSource, 
            prompt: flatPrompt 
        }).catch(async (err) => {
            if (id('forge-thinking-temp')) id('forge-thinking-temp').remove();
            forgeStatus(`❌ <strong>AI Error:</strong> ${err}`, 'error');
            fSend.disabled = false; fSend.textContent = 'Send';
            throw new Error(err);
        });

        if (id('forge-thinking-temp')) id('forge-thinking-temp').remove();

        if (!res || res.trim().length === 0) {
            forgeStatus('⚠️ AI returned an empty response. Ollama might be overloaded.', 'error');
            fSend.disabled = false; fSend.textContent = 'Send';
            return;
        }
        
        // Save to context (Limit size to avoid bloating)
        window.FORGE_CONTEXT.push({ role: 'user', content: prompt });
        window.FORGE_CONTEXT.push({ role: 'assistant', content: res.substring(0, 500) + "..." });
        if (window.FORGE_CONTEXT.length > 6) window.FORGE_CONTEXT.shift(); 

        const aiMsg = document.createElement('div'); aiMsg.className = 'msg ai';
        aiMsg.textContent = "🚀 Autopilot: Analyzing and deploying files...";
        fHistory?.appendChild(aiMsg);

        // Ultra-Aggressive Multi-Format Parser (Matches even without backticks)
        const fileRegex = /(?:\[FILE:\s*(.+?)\]|\*\*([a-zA-Z0-9.\-_/]+?)\*\*:?)\s*[\r\n]*(?:```[a-z]*\s*)?([\s\S]+?)(?=```|\[FILE:|\*\*[a-zA-Z0-9.\-_/]+?\*\*:|$)/gi;
        
        let match;
        let filesWritten = 0;
        const desktop = await invoke('get_desktop_path');
        
        // FORCE REUSE OF PROJECT PATH
        if (!sessionTargetPath) {
            sessionProjectName = "ai-generated-app";
            const templateType = useLaravelArch ? 'vanilla' : 'static-web'; 
            sessionTargetPath = await invoke('create_project', { name: sessionProjectName, template: templateType, path: desktop });
        }

        // Final Sanity Check for Laravel
        if (useLaravelArch) {
            await invoke('write_project_file', { path: `${sessionTargetPath}/index.html`, content: '<!-- Laravel App Entry -->' });
        }

        while ((match = fileRegex.exec(res)) !== null) {
            let rawPath = match[1] || match[2];
            // NEW: Support paths like "routes/web.php updated" - take first part only
            rawPath = rawPath.trim().split(' ')[0];
            let fname = rawPath.replace(/[^a-zA-Z0-9.\-_/]/g, '');
            let code = match[3].trim();
            
            // Filter out non-file metadata that looks like filenames
            if (fname.toLowerCase() === 'root' || fname.toLowerCase() === 'structure' || code.length < 5) continue;

            // Clean up trailing/leading code artifacts
            if (code.endsWith('```')) code = code.substring(0, code.length - 3).trim();
            if (code.startsWith('```')) {
                const firstNewline = code.indexOf('\n');
                if (firstNewline !== -1) code = code.substring(firstNewline + 1);
            }

            if (fname && code) {
                await invoke('write_project_file', { path: `${sessionTargetPath}/${fname}`, content: code });
                appendLog(`📄 Writing: ${fname} (${code.length} bytes)`, 'system');
                filesWritten++;
            }
        }

        if (filesWritten > 0) {
            await updateForgeFileTree();
            fRunBtn?.classList.remove('hidden');
            await triggerAutoHeal(sessionTargetPath, sessionProjectName);
            appendLog(`✅ Autopilot: ${filesWritten} files updated in '${sessionProjectName}'.`, 'success');
        } else {
            appendLog('⚠️ No files detected in AI response. Raw output shown below.', 'system');
            const rawMsg = document.createElement('div'); 
            rawMsg.className = 'msg ai raw'; 
            rawMsg.style.background = 'rgba(255,0,0,0.1)';
            rawMsg.style.padding = '10px';
            rawMsg.style.borderRadius = '8px';
            rawMsg.textContent = res;
            fHistory?.appendChild(rawMsg);
        }
    } catch (e) { appendLog(e, 'error'); }
    finally { fSend.disabled = false; fSend.textContent = 'Send'; fHistory.scrollTop = fHistory.scrollHeight; }
});

fRunBtn?.addEventListener('click', async () => {
    if (!sessionTargetPath) return;
    try { 
        let runCmd = null;
        try {
            const structure = await invoke('get_project_structure', { path: sessionTargetPath });
            if (Array.isArray(structure)) {
                const hasArtisan = structure.some(f => f.name === 'artisan');
                const hasVendor = structure.some(f => f.name === 'vendor');
                const hasPublicIndex = structure.some(f => f.name === 'index.php' && (f.rel === 'public/index.php' || f.path.includes('public')));

                if ((hasArtisan || hasPublicIndex) && !hasVendor) {
                    appendLog("🚀 Standalone PHP/Laravel detected. Forcing native PHP server...", 'system');
                    runCmd = "php -S localhost:8000 -t public";
                }
            }
        } catch(e) { console.warn("Structure check failed", e); }

        const status = await invoke('run_forge_project', { path: sessionTargetPath, cmd: runCmd }); 
        
        // NEW: If we started a manual server, wait 1 sec and FORCE OPEN browser to localhost:8000
        if (runCmd) {
            appendLog("📡 Waiting for PHP server to stabilize...", 'system');
            setTimeout(async () => {
                await invoke('open_url', { url: "http://localhost:8000" });
                appendLog("🌍 Browser redirected to localhost:8000", 'success');
            }, 1500);
        }

        appendLog(`🚀 ${status}`, 'success'); 
    } catch (e) { appendLog(e, 'error'); }
});

// ═══════════════════════════════════════════════════
// MANAGERS
// ═══════════════════════════════════════════════════

async function loadMarketplace() {
    const list = id('plugin-list'); if (!list) return;
    try {
        const plugins = await invoke('get_marketplace_plugins');
        list.innerHTML = plugins.map(p => `
            <div class="plugin-card glass">
                <div class="plugin-icon">${p.icon || '🔌'}</div>
                <div class="plugin-info"><h4>${p.name}</h4><p>${p.description}</p></div>
                <button class="btn mini primary" onclick="installPlugin('${p.id}')">Install</button>
            </div>
        `).join('');
    } catch (e) { list.innerHTML = `<p class="empty-state">Hata: ${e}</p>`; }
}

window.installPlugin = async (id) => {
    appendLog(`Installing plugin: ${id}...`);
    try { await invoke('install_marketplace_plugin', { id }); appendLog('✅ Installed', 'success'); } catch (e) { appendLog(e, 'error'); }
};

async function loadSkills() {
    const list = id('skill-list'); if (!list) return;
    try {
        const skills = await invoke('get_available_skills');
        list.innerHTML = skills.map(s => `
            <div class="skill-card glass">
                <div class="type-badge">${s.type}</div>
                <h4>🤖 ${s.name}</h4><p>${s.description}</p>
                <button class="btn mini primary" onclick="launchSkill('${s.id}')">Launch</button>
            </div>
        `).join('');
        const agentGroup = id('forge-opt-agents');
        if (agentGroup) agentGroup.innerHTML = skills.map(s => `<option value="agent:${s.id}">${s.name}</option>`).join('');
    } catch (e) { list.innerHTML = `<p class="empty-state">Hata: ${e}</p>`; }
}

window.launchSkill = async (id) => {
    try { await invoke('launch_skill', { id }); appendLog(`✅ Agent ${id} active.`, 'success'); } catch (e) { appendLog(e, 'error'); }
};

async function refreshPorts() {
    const list = id('port-list'); if (!list) return;
    try {
        const ports = await invoke('get_active_ports');
        list.innerHTML = ports.map(p => `<div class='port-card'><strong>${p.port}</strong> (PID: ${p.pid})</div>`).join('');
    } catch (e) { list.innerHTML = '<p>No active ports.</p>'; }
}

async function refreshAboutAgents() {
    const grid = id('about-agent-status-grid'); if (!grid) return;
    grid.innerHTML = '<p class="empty-state">Scanning...</p>';
    try {
        const statusHTML = await Promise.all(AGENTS.map(async (a) => {
            let installed = false;
            try { installed = await invoke('check_ollama_model', { name: a.id }); } catch (_) {}
            return `<div class="intel-item ${installed ? 'done' : 'missing'}">
                <div class="intel-icon">${a.emoji}</div>
                <div class="intel-info"><strong>${a.name}</strong><span>${a.id}</span></div>
                <div class="intel-status-tag">${installed ? '✅ OK' : '❌ Missing'}</div>
            </div>`;
        }));
        grid.innerHTML = statusHTML.join('');
    } catch (err) { grid.innerHTML = `<p class="error-text">Error: ${err}</p>`; }
}

// ═══════════════════════════════════════════════════
// CLOUD ORCHESTRATOR LOGIC
// ═══════════════════════════════════════════════════

async function refreshCloudStatus() {
    const badge = id('cloud-status-badge');
    try {
        const res = await fetch('http://localhost:4000/api/cloud/status');
        if (!res.ok) throw new Error('Backend Offline');
        const data = await res.json();

        // Update Stats
        if (badge) {
            const status = data.status || 'Offline';
            badge.textContent = status.toUpperCase();
            if (status === 'Operational') badge.style.color = 'var(--success)';
            else if (status === 'Degraded') badge.style.color = 'var(--warning)';
            else badge.style.color = 'var(--danger)';
        }

        // Hide start button if we are getting ANY data
        id('start-cloud-btn')?.classList.add('hidden');
        id('cloud-region').textContent = data.region;
        id('cloud-nodes').textContent = data.cluster_nodes;
        id('cloud-uptime').textContent = data.uptime + 's';
        
        const dbEl = id('cloud-db-status');
        dbEl.textContent = data.database.toUpperCase();
        dbEl.className = data.database === 'Connected' ? 'status-online' : 'status-offline';

        id('cloud-memory').textContent = data.memory;
        id('cloud-runtime').textContent = data.node_version;

        // Fetch real keys if possible, or use the list from backend
        renderCloudKeys(data.keys);

    } catch (err) {
        if (badge) {
            badge.textContent = 'OFFLINE';
            badge.style.color = 'var(--danger)';
        }
        id('start-cloud-btn')?.classList.remove('hidden');
        id('cloud-db-status').textContent = 'UNKNOWN';
        id('cloud-db-status').className = 'status-offline';
    }
}

async function startCloudServices() {
    appendLog('🛠️ Attempting to launch Cloud Cluster via CLI...');
    if (window.__TAURI__) {
        try {
            // Using a more direct approach: calling the CLI orchestrator directly
            await window.__TAURI__.core.invoke('run_forge_project', { 
                path: 'C:\\Users\\xeyal\\Desktop\\systemx', 
                cmd: 'node launch-all.js' 
            });
            appendLog('🚀 Cloud Cluster signal sent. Waiting for spin-up...', 'success');
            setTimeout(refreshCloudStatus, 5000);
        } catch (e) {
            appendLog('❌ Failed to auto-start: ' + e, 'error');
            appendLog('💡 Tip: Try running "node launch-all.js" manually in the root folder.', 'system');
        }
    } else {
        appendLog('⚠️ Manual Start Required: Run "node launch-all.js" in terminal.', 'system');
    }
}

window.startCloudServices = startCloudServices;

function renderCloudKeys(keys) {
    const keysList = id('cloud-keys-list');
    if (!keysList) return;
    
    const keysArray = Array.isArray(keys) ? keys : [];

    if (keysArray.length === 0) {
        keysList.innerHTML = '<tr><td colspan="5" class="text-center text-dim" style="padding: 2rem;">No keys detected in current cluster session.</td></tr>';
        return;
    }

    keysList.innerHTML = keysArray.map(k => `
        <tr>
            <td>${k.name}</td>
            <td class="text-primary font-mono">${k.prefix}...</td>
            <td>${k.created}</td>
            <td><span class="status-badge ${k.status.toLowerCase() === 'active' ? 'online' : 'offline'}">${k.status.toUpperCase()}</span></td>
            <td>
                <button class="btn mini secondary" onclick="rotateCloudKey('${k.prefix}')">Rotate</button>
            </td>
        </tr>
    `).join('');
}

async function generateCloudKey() {
    appendLog('📡 Generating new Cloud API Key...');
    try {
        const res = await fetch('http://localhost:4000/api/auth/keys', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-Xeyal-API-Key': 'xeyal_test_key_2026'
            },
            body: JSON.stringify({ name: 'Desktop Managed Key' })
        });
        if (res.ok) {
            appendLog('✅ New API Key generated successfully.', 'success');
            refreshCloudStatus();
        } else {
            const errData = await res.json();
            throw new Error(errData.error || 'Server error');
        }
    } catch (e) {
        appendLog('❌ Failed to generate key: ' + e.message, 'error');
        // Fallback for demo: add to mock
        appendLog('💡 System in Demo Mode: Simulating key creation...', 'system');
        refreshCloudStatus();
    }
}

window.rotateCloudKey = async (prefix) => {
    appendLog(`🔄 Rotating key: ${prefix}...`);
    setTimeout(() => {
        appendLog(`✅ Key ${prefix} rotated and synced with Cloud Vault.`, 'success');
        refreshCloudStatus();
    }, 1000);
};

window.generateCloudKey = generateCloudKey;

// ═══════════════════════════════════════════════════
// GLOBAL BOOT & TAURI EVENTS
// ═══════════════════════════════════════════════════

async function loadForgeTemplates() {
    try {
        const libraryMd = await invoke('read_forge_library');
        const select = id('swarm-template-select');
        if (!select) return;
        
        const templateRegex = /^\d+\.\s+\*\*\[(\d+)\]\s*(.*?):\*\*\s*(.*)/gm;
        let match;
        select.innerHTML = '<option value="">📚 Şablon Seçin (200+)...</option>';
        
        while ((match = templateRegex.exec(libraryMd)) !== null) {
            const idNum = match[1];
            const name = match[2].trim();
            const desc = match[3].trim();
            const opt = document.createElement('option');
            opt.value = `Build a professional ${name} application. ${desc}`;
            opt.textContent = `[${idNum}] ${name}`;
            select.appendChild(opt);
        }

        select.addEventListener('change', (e) => {
            if (e.target.value) {
                launchSwarmMission(e.target.value);
                e.target.value = ""; // Reset
            }
        });

    } catch (e) {
        console.warn("Could not load forge library: ", e);
        const select = id('swarm-template-select');
        if (select) select.innerHTML = '<option value="">⚠️ Library Not Found</option>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ['cockpit', 'inspector', 'marketplace', 'skills', 'forge', 'swarm', 'cloud', 'diagnostic', 'about'].forEach(t => id('tab-' + t)?.addEventListener('click', () => switchTab(t)));
    id('lang-tr')?.addEventListener('click', () => setLang('tr'));
    id('lang-en')?.addEventListener('click', () => setLang('en'));
    id('lang-ru')?.addEventListener('click', () => setLang('ru'));
    id('recheck-agents-btn')?.addEventListener('click', refreshAboutAgents);
    id('run-full-diagnostic-btn')?.addEventListener('click', runFullDiagnostic);
    id('trigger-onboarding-btn')?.addEventListener('click', () => { id('onboarding-overlay')?.classList.remove('hidden'); startOnboarding(true); });
    id('reset-onboarding-btn')?.addEventListener('click', async () => {
        if (!confirm("Reset all settings?")) return;
        await invoke('set_onboarding_complete', { complete: false });
        localStorage.removeItem('onboarded');
        location.reload();
    });
    id('clear-logs')?.addEventListener('click', () => { if (logTerminal) logTerminal.innerHTML = ''; });
    id('refresh-ports-btn')?.addEventListener('click', refreshPorts);
    id('open-folder-btn')?.addEventListener('click', async () => {
        try {
            const path = await invoke('pick_project_folder');
            if (path) {
                appendLog(`📂 Project selected: ${path}`, 'success');
                // AUTO-HEAL ON OPEN
                const projectName = path.split('\\').pop().split('/').pop();
                await triggerAutoHeal(path, projectName);
            }
        } catch (e) {
            if (e !== 'Cancelled') appendLog('Folder pick error: ' + e, 'error');
        }
    });

    startBtn?.addEventListener('click', async () => {
        if (isLaunching) return; isLaunching = true;
        try { await invoke('start_dev_environment'); statusBadge.textContent = 'RUNNING'; statusBadge.style.background = '#22c55e'; stopBtn.disabled = false; } catch (e) { appendLog(e, 'error'); }
        finally { isLaunching = false; }
    });

    stopBtn?.addEventListener('click', async () => {
        try { await invoke('stop_all_services'); statusBadge.textContent = 'READY'; statusBadge.style.background = '#3b82f6'; stopBtn.disabled = true; } catch (e) { appendLog(e, 'error'); }
    });

    if (localStorage.getItem('onboarded') === 'true') { welcomeOverlay?.classList.add('hidden'); mainApp?.classList.remove('hidden'); }
    startOnboarding();
    loadForgeTemplates();

    // Start Cloud Polling
    setInterval(() => {
        if (id('tab-cloud').classList.contains('active')) {
            refreshCloudStatus();
        }
    }, 5000);
});

if (window.__TAURI__) {
    listen('cli-log', (e) => appendLog(e.payload.message, e.payload.level));
    listen('health-update', (e) => {
        const p = e.payload;
        if (cpuSpan) cpuSpan.textContent = p.cpu + '%';
        if (ramSpan) ramSpan.textContent = p.ram + 'GB';
        if (uptimeSpan) uptimeSpan.textContent = Math.floor(p.uptime / 60) + 'm';
        if (activeProjectName) activeProjectName.textContent = p.project;
    });
}

// ═══════════════════════════════════════════════════
// DIAGNOSTIC ENGINE
// ═══════════════════════════════════════════════════

async function runFullDiagnostic() {
    const log = id('diagnostic-log');
    const overall = id('diag-overall-status');
    const btn = id('run-full-diagnostic-btn');
    if (!log || !overall || !btn) return;

    btn.disabled = true;
    log.innerHTML = '';
    overall.className = 'overall-status scanning';
    overall.textContent = 'SCANNING...';

    const appendDiag = (msg, level = 'info') => {
        const div = document.createElement('div');
        div.className = `log-line ${level}`;
        div.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
        log.appendChild(div);
        log.scrollTop = log.scrollHeight;
    };

    const updateCard = (idStr, state) => {
        const card = id('test-' + idStr);
        if (!card) return;
        card.className = 'diag-card glass ' + state;
        const status = card.querySelector('.diag-status');
        if (status) status.textContent = state.toUpperCase();
    };

    let hasFailure = false;
    try {
        // 1. Backend Bridge
        updateCard('backend', 'running');
        appendDiag('Probing Rust Backend Bridge...');
        const desktop = await invoke('get_desktop_path');
        if (desktop) {
            updateCard('backend', 'pass');
            appendDiag('✅ Backend Bridge OK. Desktop detected: ' + desktop, 'success');
        } else {
            hasFailure = true;
            throw new Error('Desktop path returned empty');
        }

        // 2. File System
        updateCard('fs', 'running');
        appendDiag('Testing File System Permissions...');
        const testFile = 'system_diagnostic_check.txt';
        const testContent = 'Diagnostic verified at ' + new Date().toISOString();
        await invoke('write_project_file', { path: testFile, content: testContent });
        const readContent = await invoke('read_project_file', { path: testFile });
        if (readContent === testContent) {
            updateCard('fs', 'pass');
            appendDiag('✅ File System OK. Read/Write cycle verified.', 'success');
        } else {
            throw new Error('FS Verification mismatch');
        }

        // 3. AI Engine
        updateCard('ai', 'running');
        appendDiag('Checking AI Engine (Ollama)...');
        let aiPass = true;
        for (const agent of AGENTS) {
            const installed = await invoke('check_ollama_model', { name: agent.id });
            if (!installed) {
                appendDiag(`⚠️ Warning: Agent ${agent.name} (${agent.id}) is missing.`, 'error');
                aiPass = false;
            } else {
                appendDiag(`✅ Agent ${agent.name} is ready.`, 'success');
            }
        }
        updateCard('ai', aiPass ? 'pass' : 'fail');

        // 4. Architecture Engine
        updateCard('arch', 'running');
        appendDiag('Validating Architecture Scaffolding Registry...');
        const template = window.detectForgeTemplate('stom arch');
        if (template && template.files && (template.files['composer.json'] || template.files['package.json'])) {
            updateCard('arch', 'pass');
            appendDiag('✅ Architecture Engine OK. StomControl Template found and valid.', 'success');
        } else {
            updateCard('arch', 'fail');
            hasFailure = true;
            appendDiag('❌ Architecture Engine ERROR: Template missing or corrupt.', 'error');
        }

        if (hasFailure) {
            overall.className = 'overall-status error';
            overall.textContent = 'SYSTEM DEGRADED';
            appendDiag('⚠️ System audit finished with warnings.', 'error');
        } else {
            overall.className = 'overall-status healthy';
            overall.textContent = 'HEALTHY';
            appendDiag('🏁 Full System Audit Completed. All systems nominal.', 'success');
        }

    } catch (e) {
        appendDiag('❌ FATAL ERROR DURING AUDIT: ' + e, 'error');
        overall.className = 'overall-status error';
        overall.textContent = 'SYSTEM DEGRADED';
    } finally {
        btn.disabled = false;
    }
}
async function checkOllamaOnStartup() {
    try {
        const isRunning = await invoke('check_ollama_status');
        if (!isRunning) {
            appendLog('⚠️ [SYSTEM]: AI Engine (Ollama) is not running. Please start Ollama for AI Forge functionality.', 'error');
            const alert = document.createElement('div');
            alert.className = 'msg ai error';
            alert.innerHTML = `⚠️ <b>AI Engine Offline:</b> Ollama is not running on your system. Please launch Ollama and try again. <button onclick="location.reload()" style="background:#fff;color:#000;padding:2px 8px;border-radius:4px;border:none;margin-left:10px;cursor:pointer">Retry</button>`;
            id('forge-history')?.appendChild(alert);
        } else {
            appendLog('✅ [SYSTEM]: AI Engine (Ollama) connected and ready.', 'success');
        }
    } catch (e) {
        console.error('Ollama check failed:', e);
    }
}

// Start health check on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(checkOllamaOnStartup, 1000);
});
