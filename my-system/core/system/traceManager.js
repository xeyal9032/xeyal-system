import crypto from 'crypto';
import logger from './logger.js';
import fs from 'fs';
import path from 'path';

/**
 * Action Trace System
 * Connects distributed actions into logical chains to enable full root-cause tracking.
 */
class TraceManager {
    constructor() {
        this.activeTraces = new Map();
        this.logDirectory = path.join(process.cwd(), 'logs', 'traces');
        
        if (!fs.existsSync(this.logDirectory)) {
            fs.mkdirSync(this.logDirectory, { recursive: true });
        }
    }

    startTrace(actionName, initialContext = {}) {
        const traceId = crypto.randomUUID();
        const trace = {
            id: traceId,
            action: actionName,
            context: initialContext,
            steps: [],
            startTime: Date.now(),
            status: 'RUNNING'
        };
        this.activeTraces.set(traceId, trace);
        logger.info(`[TRACE_START] ${actionName} (ID: ${traceId})`, { category: 'TRACE' });
        return traceId;
    }

    addStep(traceId, stepName, data = {}) {
        const trace = this.activeTraces.get(traceId);
        if (!trace) return;

        trace.steps.push({
            step: stepName,
            time: Date.now(),
            data
        });
        logger.info(`[TRACE_STEP] ${trace.action} -> ${stepName}`, { category: 'TRACE', traceId });
    }

    endTrace(traceId, status = 'SUCCESS', error = null) {
        const trace = this.activeTraces.get(traceId);
        if (!trace) return;

        trace.status = status;
        trace.endTime = Date.now();
        trace.duration = trace.endTime - trace.startTime;
        if (error) trace.error = error;

        this.activeTraces.delete(traceId);
        
        // Log final trace
        const traceFile = path.join(this.logDirectory, `${traceId}.json`);
        fs.writeFileSync(traceFile, JSON.stringify(trace, null, 2));

        logger.info(`[TRACE_END] ${trace.action} completed in ${trace.duration}ms [${status}]`, { category: 'TRACE' });
        return trace;
    }
}

const traceManager = new TraceManager();
export default traceManager;
