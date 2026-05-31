import express from 'express';
import { createServer } from 'http';
import { execSync } from 'child_process';
import { Server } from 'socket.io';
import path from 'path';
import open from 'open';
import basicAuth from 'express-basic-auth';
import logger from './logger.js';
import chalk from 'chalk';
import si from 'systeminformation';
import profiler from './profiler.js';

import authEngine from './auth.js';
import fs from 'fs-extra';
import state from './state.js';
import bus from './events.js';
import serviceManager from '../runtime/serviceManager.js';
import portManager from '../runtime/portManager.js';
import intelligence from '../intelligence/intelligence.js';
import projectAnalyzer from '../runtime/projectAnalyzer.js';
import ollamaManager from '../intelligence/ollamaManager.js';
import systemStatus from './systemStatus.js';
import templateManager from '../runtime/templateManager.js';

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.DASHBOARD_PORT || 3000;
const HOST = process.env.DASHBOARD_HOST || '0.0.0.0';


export const startDashboard = async () => {
  const publicPath = path.resolve('dashboard/public');

  // Multi-User Authorizer
  app.use(basicAuth({
    authorizer: (username, password, cb) => {
        authEngine.getUsers().then(users => {
            const storedHash = users[username];
            const isValid = authEngine.verifyPassword(password, storedHash);
            return cb(null, isValid);
        }).catch(() => cb(null, false));
    },
    authorizeAsync: true,
    challenge: true,
    realm: 'My-System Dashboard',
  }));

  app.use(express.static(publicPath));

  io.on('connection', (socket) => {
    logger.info('Intelligent Dashboard client connected.');
    sendSystemHealth();

    // Forward AutoFix events to connected client
    const handleFixInit = (message) => socket.emit('autofix_event', { eventType: 'init', ...message.payload });
    const handleFixSuccess = (message) => socket.emit('autofix_event', { eventType: 'success', ...message.payload });
    
    bus.on('AUTONOMOUS_FIX_INITIATED', handleFixInit);
    bus.on('AUTONOMOUS_FIX_SUCCESS', handleFixSuccess);

    socket.on('disconnect', () => {
        bus.off('AUTONOMOUS_FIX_INITIATED', handleFixInit);
        bus.off('AUTONOMOUS_FIX_SUCCESS', handleFixSuccess);
    });

    // 1. Explore Project (Read Directory)
    socket.on('explore_project', async (dirPath) => {
        try {
            // Context Switch: Cleanup if new project path
            if (state.get('currentProjectPath') && state.get('currentProjectPath') !== dirPath) {
                logger.info(`Switching context from ${state.get('currentProjectPath')} to ${dirPath}. Stopping services.`);
                serviceManager.stopAll();
                socket.emit('stack_stopped');
            }
            state.set('currentProjectPath', dirPath);

            const items = await fs.readdir(dirPath);
            const structure = await Promise.all(items.map(async (item) => {
                const fullPath = path.join(dirPath, item);
                const stats = await fs.stat(fullPath);
                return {
                    name: item,
                    path: fullPath,
                    isDir: stats.isDirectory(),
                    size: stats.size
                };
            }));
            socket.emit('explorer_data', { path: dirPath, items: structure });

            // Auto-detect stack and emit
            const projectInfo = await projectAnalyzer.analyze(dirPath);
            if (projectInfo.framework !== 'unknown') {
                socket.emit('stack_detected', projectInfo);
                logger.info(`Stack detected for ${dirPath}: ${projectInfo.framework}`);
            }
        } catch (error) {
            socket.emit('error', `Failed to explore: ${error.message}`);
        }
    });

    // 2. Read File
    socket.on('read_file', async (filePath) => {
        try {
            const content = await fs.readFile(filePath, 'utf8');
            socket.emit('file_content', { path: filePath, content });
        } catch (error) {
            socket.emit('error', `Failed to read file: ${error.message}`);
        }
    });

    // 3. Save File
    socket.on('save_file', async ({ path: filePath, content }) => {
        try {
            await fs.writeFile(filePath, content, 'utf8');
            logger.info(`File saved via dashboard: ${filePath}`, { category: 'WORKFLOW' });
            socket.emit('save_success', { path: filePath });
        } catch (error) {
            socket.emit('error', `Failed to save file: ${error.message}`);
        }
    });

    // 4. Deep Scan
    socket.on('deep_scan', async (projectPath) => {
        logger.info(`Deep Scan initiated for: ${projectPath}`, { category: 'SYSTEM' });
        const issues = await intelligence.deepScan(projectPath);
        socket.emit('scan_results', { path: projectPath, issues });
    });

    // 5. Native Folder Picker (Platform Aware)
    socket.on('pick_folder', async () => {
        try {
            const isWin = process.platform === 'win32';
            if (isWin) {
                const psScript = `
                    Add-Type -AssemblyName System.Windows.Forms;
                    $FolderBrowser = New-Object System.Windows.Forms.FolderBrowserDialog;
                    $FolderBrowser.Description = 'Select Project Folder';
                    $FolderBrowser.ShowNewFolderButton = $true;
                    $result = $FolderBrowser.ShowDialog();
                    if ($result -eq 'OK') { $FolderBrowser.SelectedPath }
                `;
                const command = `powershell -NoProfile -Command "${psScript.replace(/\n/g, ' ')}"`;
                const selectedPath = execSync(command).toString().trim();
                
                if (selectedPath) {
                    socket.emit('folder_picked', { path: selectedPath });
                    logger.info(`Folder picked via native dialog: ${selectedPath}`);
                }
            } else {
                // macOS/Linux Fallback
                logger.warn('Native picker only available on Windows for CLI. Use Desktop App for full support.');
                socket.emit('error', 'Native picker only available on Windows for standalone CLI dashboard.');
            }
        } catch (error) {
            socket.emit('error', `Picker failed: ${error.message}`);
        }
    });

    // 6. Stack Control
    socket.on('start_stack', async (data) => {
        try {
            logger.info(`Starting stack for project: ${data.name} (${data.framework})`);
            // For now, we use a default service structure or the detected startCmd
            const service = {
                name: data.name,
                cmd: data.startCmd,
                port: data.port,
                restart: true
            };
            serviceManager.startService(service, false);
            socket.emit('stack_started', { name: data.name });
        } catch (error) {
            socket.emit('error', `Failed to start stack: ${error.message}`);
        }
    });

    socket.on('clear_port_and_start', async (data) => {
        try {
            logger.info(`Clearing port ${data.port} (PID: ${data.pid}) for ${data.service.name}`);
            const killed = await portManager.killProcess(data.pid);
            if (killed) {
                serviceManager.startService(data.service, true);
                socket.emit('stack_started', { name: data.service.name });
            } else {
                socket.emit('error', `Could not clear port ${data.port}`);
            }
        } catch (error) {
            socket.emit('error', `Port clearing failed: ${error.message}`);
        }
    });

    socket.on('stop_stack', () => {
        serviceManager.stopAll();
        socket.emit('stack_stopped');
    });

    // 7. AI Forge / Ollama Integration
    socket.on('invoke_ollama', async (data) => {
        try {
            logger.info(`AI Forge query: ${data.model}`);
            const response = await ollamaManager.forgeChat(data.prompt, data.model);
            if (socket.connected) {
                socket.emit('ollama_response', response);
            }
        } catch (error) {
            if (socket.connected) {
                socket.emit('error', `AI Forge failed: ${error.message}`);
            }
        }
    });

    // 8. Inspector / Port Probing
    socket.on('get_inspector_data', async () => {
        try {
            const status = await systemStatus.getFullStatus();
            socket.emit('inspector_data', status.ports);
        } catch (error) {
            socket.emit('error', `Inspector failed: ${error.message}`);
        }
    });

    // 9. Project Scaffolding
    socket.on('scaffold_project', async (data) => {
        try {
            logger.info(`Scaffolding project: ${data.name} with template ${data.template}`);
            const targetPath = path.join(process.cwd(), data.name);
            const success = await templateManager.bootstrap(data.template, targetPath);
            if (success) {
                socket.emit('scaffold_success', { name: data.name, path: targetPath });
            } else {
                socket.emit('error', `Failed to bootstrap ${data.name}`);
            }
        } catch (error) {
            socket.emit('error', `Scaffolding error: ${error.message}`);
        }
    });
  });

  // Globalize IO for logger transport
  global.dashboardIO = io;

  // Check for dashboard port conflict
  const existingPid = await portManager.getProcessOnPort(PORT);
  if (existingPid) {
      logger.warn(`Dashboard port ${PORT} in use by PID ${existingPid}. Attempting to clear...`);
      await portManager.killProcess(existingPid);
  }

  server.listen(PORT, HOST, () => {
    console.log(chalk.blue.bold(`\n🖥️  Intelligent Dashboard active at: http://localhost:${PORT}`));
    console.log(chalk.cyan(`  - Performance Monitoring: ACTIVE`));
    console.log(chalk.gray(`  - Session: ${profiler.getSessionId()}\n`));
    
    logger.event('DASHBOARD_STARTED', 'system', { port: PORT, session: profiler.getSessionId() });

    if (process.env.AUTO_OPEN_DASHBOARD !== 'false') {
      open(`http://localhost:${PORT}`);
    }
  });

  // 7. Resource Monitor (Inspector Sync)
  setInterval(async () => {
      try {
          const status = await systemStatus.getFullStatus();
          io.emit('inspector_update', status.ports);
      } catch (e) {
          // Silent fail for background sync
      }
  }, 10000);

  setInterval(sendSystemHealth, 3000);
};

const sendSystemHealth = async () => {
  try {
    const cpu = await si.currentLoad();
    const mem = await si.mem();
    
    io.emit('health_update', {
      session: profiler.getSessionId(),
      cpu: Math.round(cpu.currentLoad),
      memory: Math.round((mem.active / mem.total) * 100),
      uptime: profiler.getUptime(),
      latency: Math.floor(Math.random() * 20) + 5 // Simulated latency for UI metric
    });
  } catch (error) {
    // Silent fail for metrics
  }
};

export default {
  startDashboard
};
