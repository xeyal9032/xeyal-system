import crypto from 'crypto';

/**
 * Profiler Core
 * Manages development sessions and performance timing.
 */
class Profiler {
    constructor() {
        this.sessionId = crypto.randomBytes(4).toString('hex').toUpperCase();
        this.startTimes = new Map();
        this.sessionStartTime = Date.now();
    }

    getSessionId() {
        return this.sessionId;
    }

    /**
     * Start timing a specific event
     */
    start(label) {
        this.startTimes.set(label, process.hrtime());
    }

    /**
     * Stop timing and return duration in ms
     */
    stop(label) {
        const start = this.startTimes.get(label);
        if (!start) return 0;
        
        const diff = process.hrtime(start);
        const duration = (diff[0] * 1e3) + (diff[1] * 1e-6);
        this.startTimes.delete(label);
        return parseFloat(duration.toFixed(2));
    }

    getUptime() {
        return Math.floor((Date.now() - this.sessionStartTime) / 1000);
    }
}

const profiler = new Profiler();
export default profiler;
