import fs from 'fs-extra';
import path from 'path';
import profiler from './profiler.js';
import logger from './logger.js';

const MEMORY_FILE = path.resolve('config/memory.json');
const SESSION_DIR = path.resolve('logs/sessions');

class SessionMemory {
    constructor() {
        this.currentSession = {
            id: profiler.getSessionId(),
            startTime: new Date().toISOString(),
            events: [],
            fixes: [],
            errors: []
        };
        this.ensureDir();
    }

    async ensureDir() {
        await fs.ensureDir(SESSION_DIR);
    }

    async getMemory() {
        return await fs.readJson(MEMORY_FILE).catch(() => ({ autopilot: true, stats: { totalFixes: 0, commonErrors: {} } }));
    }

    async saveMemory(data) {
        await fs.writeJson(MEMORY_FILE, data, { spaces: 2 });
    }

    async logEvent(type, data) {
        this.currentSession.events.push({ timestamp: new Date().toISOString(), type, ...data });
        await this.persistSession();
    }

    async persistSession() {
        const file = path.join(SESSION_DIR, `session-${this.currentSession.id}.json`);
        await fs.writeJson(file, this.currentSession, { spaces: 2 });
    }

    /**
     * Update global stats based on session outcome
     */
    async recordFix(problem, solution) {
        const mem = await this.getMemory();
        mem.stats.totalFixes++;
        mem.stats.commonErrors[problem] = (mem.stats.commonErrors[problem] || 0) + 1;
        this.currentSession.fixes.push({ problem, solution, time: new Date().toISOString() });
        await this.saveMemory(mem);
        await this.persistSession();
    }
}

const sessionMemory = new SessionMemory();
export default sessionMemory;
