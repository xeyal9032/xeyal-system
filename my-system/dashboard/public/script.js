const socket = io();

// UI State
let activeTab = 'cockpit';
let currentProjectPath = '';
let currentFilePath = '';

// --- TAB NAVIGATION ---
const tabs = ['cockpit', 'explorer', 'inspector', 'forge', 'marketplace', 'about'];
tabs.forEach(tabId => {
    const btn = document.getElementById(`tab-${tabId}`);
    btn.onclick = () => switchTab(tabId);
});

function switchTab(tabId) {
    activeTab = tabId;
    tabs.forEach(t => {
        const page = document.getElementById(`page-${t}`);
        const btn = document.getElementById(`tab-${t}`);
        if (page) page.classList.toggle('hidden', t !== tabId);
        if (btn) btn.classList.toggle('active', t === tabId);
    });

    if (tabId === 'inspector') {
        socket.emit('get_inspector_data');
    }
}

// --- COCKPIT: METRICS & LOGS ---
const cpuFill = document.getElementById('cpu-fill');
const cpuVal = document.getElementById('cpu-val');
const memFill = document.getElementById('mem-fill');
const memVal = document.getElementById('mem-val');
const logContainer = document.getElementById('log-container');
const sessionIdEl = document.getElementById('session-id');
const uptimeEl = document.getElementById('uptime');

socket.on('health_update', (data) => {
    sessionIdEl.innerText = data.session;
    uptimeEl.innerText = `${data.uptime}s`;
    
    cpuFill.style.width = `${data.cpu}%`;
    cpuVal.innerText = `${data.cpu}%`;
    
    memFill.style.width = `${data.memory}%`;
    memVal.innerText = `${data.memory}%`;
});

socket.on('log', (log) => {
    appendLog(log.level, log.message);
});

function appendLog(level, message) {
    const line = document.createElement('div');
    line.className = `log-line ${level}`;
    line.innerText = `[${new Date().toLocaleTimeString()}] ${message}`;
    logContainer.appendChild(line);
    logContainer.scrollTop = logContainer.scrollHeight;
}

// --- EXPLORER & EDITOR ---
const projectPathInput = document.getElementById('project-path-input');
const loadPathBtn = document.getElementById('load-path-btn');
const fileTree = document.getElementById('file-tree');
const activeFileName = document.getElementById('active-file-name');
const fileEditor = document.getElementById('file-editor');
const saveFileBtn = document.getElementById('save-file-btn');
const deepScanBtn = document.getElementById('deep-scan-btn');
const pickFolderBtn = document.getElementById('pick-folder-btn');
const scanResults = document.getElementById('scan-results');

loadPathBtn.onclick = () => {
    const path = projectPathInput.value;
    if (path) {
        currentProjectPath = path;
        socket.emit('explore_project', path);
    }
};

pickFolderBtn.onclick = () => socket.emit('pick_folder');

socket.on('folder_picked', (data) => {
    projectPathInput.value = data.path;
    currentProjectPath = data.path;
    socket.emit('explore_project', data.path);
    showToast('success', 'Project path updated');
});

socket.on('explorer_data', (data) => {
    fileTree.innerHTML = '';
    // Sort directories first
    data.items.sort((a,b) => b.isDir - a.isDir).forEach(item => {
        const div = document.createElement('div');
        div.className = `tree-item ${item.isDir ? 'dir' : 'file'}`;
        div.innerHTML = `<i class="fas fa-${item.isDir ? 'folder' : 'file-code'}"></i> ${item.name}`;
        div.onclick = () => {
            if (item.isDir) {
                projectPathInput.value = item.path;
                socket.emit('explore_project', item.path);
            } else {
                currentFilePath = item.path;
                socket.emit('read_file', item.path);
            }
        };
        fileTree.appendChild(div);
    });
});

socket.on('file_content', (data) => {
    activeFileName.innerText = data.path.split(/[\\/]/).pop();
    fileEditor.value = data.content;
    currentFilePath = data.path;
    saveFileBtn.classList.remove('hidden');
});

saveFileBtn.onclick = () => {
    if (currentFilePath) {
        socket.emit('save_file', { path: currentFilePath, content: fileEditor.value });
    }
};

socket.on('save_success', () => showToast('success', 'File saved!'));

// --- INSPECTOR ---
const portList = document.getElementById('port-list');

socket.on('inspector_data', (ports) => renderInspector(ports));
socket.on('inspector_update', (ports) => {
    if (activeTab === 'inspector') renderInspector(ports);
});

function renderInspector(ports) {
    portList.innerHTML = '';
    if (!ports || ports.length === 0) {
        portList.innerHTML = '<div class="empty-state">No active ports detected.</div>';
        return;
    }
    ports.forEach(p => {
        const card = document.createElement('div');
        card.className = 'port-card';
        card.innerHTML = `
            <div class="port-num">${p.port}</div>
            <div class="port-process">${p.process} (PID: ${p.pid})</div>
        `;
        portList.appendChild(card);
    });
}

// --- AI FORGE ---
const forgeInput = document.getElementById('forge-user-input');
const forgeSend = document.getElementById('forge-send-btn');
const forgeHistory = document.getElementById('forge-chat-history');
const forgeModel = document.getElementById('forge-model-select');

forgeSend.onclick = () => {
    const prompt = forgeInput.value.trim();
    if (!prompt) return;

    appendChat('user', prompt);
    socket.emit('invoke_ollama', { prompt, model: forgeModel.value });
    forgeInput.value = '';
};

socket.on('ollama_response', (response) => {
    appendChat('ai', response);
});

function appendChat(role, message) {
    const div = document.createElement('div');
    div.className = `msg ${role}`;
    div.innerText = (role === 'ai' ? 'SYSTEM: ' : '') + message;
    forgeHistory.appendChild(div);
    forgeHistory.scrollTop = forgeHistory.scrollHeight;
}

// --- ACTIONS & TOASTS ---
function showToast(level, msg) {
    const toast = document.getElementById('alert-toast');
    toast.className = `alert-toast ${level}`;
    toast.innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

socket.on('error', (msg) => showToast('error', msg));

socket.on('stack_detected', (data) => {
    showConfirm('Stack Detected 🚀', `Detected ${data.framework}. Start services?`, () => {
        socket.emit('start_stack', data);
    });
});

socket.on('stack_started', (data) => {
    showToast('success', `Services for ${data.name} running!`);
    document.getElementById('stop-services-btn').classList.remove('hidden');
    document.getElementById('project-info').classList.remove('hidden');
    document.getElementById('active-project-name').innerText = data.name;
    document.getElementById('active-framework-badge').innerText = data.framework;
    switchTab('cockpit');
});

socket.on('stack_stopped', () => {
    document.getElementById('stop-services-btn').classList.add('hidden');
    document.getElementById('project-info').classList.add('hidden');
    showToast('info', 'Services stopped.');
});

document.getElementById('stop-services-btn').onclick = () => socket.emit('stop_stack');

function showConfirm(title, msg, onYes) {
    const modal = document.getElementById('confirm-modal');
    document.getElementById('confirm-title').innerText = title;
    document.getElementById('confirm-msg').innerText = msg;
    modal.classList.remove('hidden');
    document.getElementById('confirm-yes').onclick = () => {
        onYes();
        modal.classList.add('hidden');
    };
    document.getElementById('confirm-no').onclick = () => modal.classList.add('hidden');
}

// --- ABOUT & LANGUAGES ---
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.onclick = () => {
        const lang = btn.getAttribute('data-lang');
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b === btn));
        
        // Match IDs: about-tr, about-en, about-ru
        document.querySelectorAll('.about-content').forEach(c => {
            c.classList.toggle('hidden', c.id !== `about-${lang}`);
        });
    };
});

// --- CREATE PROJECT MODAL ---
const createModal = document.getElementById('create-modal');
const createBtn = document.getElementById('create-project-btn');
const confirmCreateBtn = document.getElementById('confirm-create-btn');
const newProjectName = document.getElementById('new-project-name');
const templateOpts = document.querySelectorAll('.template-opt');

let selectedTemplate = 'node-express';

if (createBtn) {
    createBtn.onclick = () => createModal.classList.remove('hidden');
}

templateOpts.forEach(opt => {
    opt.onclick = () => {
        templateOpts.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        selectedTemplate = opt.getAttribute('data-template');
    };
});

confirmCreateBtn.onclick = () => {
    const name = newProjectName.value.trim();
    if (!name) {
        showToast('error', 'Please enter a project name');
        return;
    }

    socket.emit('scaffold_project', { name, template: selectedTemplate });
    createModal.classList.add('hidden');
    showToast('info', `Building ${name}...`);
};

socket.on('scaffold_success', (data) => {
    showToast('success', `Project ${data.name} created!`);
    projectPathInput.value = data.path;
    socket.emit('explore_project', data.path);
});
