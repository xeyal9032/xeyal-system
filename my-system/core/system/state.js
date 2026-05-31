import fs from 'fs-extra';
import path from 'path';
import bus from './events.js';
import logger from './logger.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STATE_FILE = path.resolve(__dirname, '../../config/state.json');

/**
 * State Engine
 * Hybrid In-Memory/Persistent Single Source of Truth.
 */
class StateEngine {
    constructor() {
        this.memoryState = {
            activeProject: null,
            runningServices: [],
            status: 'BOOTING',
            lastAlert: null,
            uptime: 0,
            metrics: {}
        };
        this.persistentState = {
            totalCrashes: 0,
            totalFixes: 0,
            crashesPrevented: 0,
            timeSavedMs: 0,
            autopilotEnabled: true,
            lastKnownGoodState: null,
            safeMode: true
        };
    }

    async init() {
        try {
            if (await fs.pathExists(STATE_FILE)) {
                const saved = await fs.readJson(STATE_FILE);
                this.persistentState = { ...this.persistentState, ...saved };
            }
        } catch (e) {
            // Silently recover if state file is corrupt
            console.error('[State] Failed to load persistent state:', e.message);
        }
        
        this.memoryState.status = this.persistentState.safeMode ? 'SAFE_MODE' : 'READY';
        
        // Listen to all events for centralized logging if needed
        bus.on('*', (msg) => {
            this.memoryState.lastAlert = msg;
        });

        bus.broadcast('STATE_INIT', 'SYSTEM', { status: this.memoryState.status });
    }

    /**
     * Update state and broadcast changes
     */
    set(key, value, persistent = false) {
        if (persistent && this.persistentState.hasOwnProperty(key)) {
            this.persistentState[key] = value;
            this.save();
        } else {
            this.memoryState[key] = value;
        }
        
        bus.broadcast('STATE_UPDATE', 'SYSTEM', { key, value, persistent });
    }

    get(key) {
        return this.memoryState[key] ?? this.persistentState[key];
    }

    async save() {
        try {
            await fs.ensureDir(path.dirname(STATE_FILE));
            await fs.writeJson(STATE_FILE, this.persistentState, { spaces: 2 });
        } catch (e) {
            console.error('[State] Failed to save state:', e.message);
        }
    }

    async updateServiceStatus(name, status, details = {}) {
        const services = this.memoryState.runningServices || [];
        const idx = services.findIndex(s => s.name === name);
        
        const serviceData = { name, status, ...details, updatedAt: new Date().toISOString() };
        
        if (idx > -1) {
            services[idx] = serviceData;
        } else {
            services.push(serviceData);
        }
        
        this.memoryState.runningServices = services;
        bus.broadcast('SERVICE_STATUS_CHANGE', 'RUNTIME', serviceData);
    }

    async incrementCrash() {
        this.persistentState.totalCrashes = (this.persistentState.totalCrashes || 0) + 1;
        if (this.persistentState.totalCrashes >= 2) { 
            this.persistentState.safeMode = true;
            this.memoryState.status = 'SAFE_MODE';
            logger.error('CRITICAL: Max retries exceeded. System entering SAFE_MODE protection.', { category: 'SYSTEM' });
        }
        await this.save();
        bus.broadcast('CRASH_DETECTED', 'SYSTEM', { count: this.persistentState.totalCrashes });
    }

    async recordMetric(type, value = 1) {
        if (this.persistentState[type] !== undefined) {
            this.persistentState[type] += value;
            await this.save();
            bus.broadcast('METRICS_UPDATED', 'SYSTEM', { metrics: this.persistentState });
        }
    }
}

const state = new StateEngine();
export default state;
