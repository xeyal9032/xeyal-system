import analyzer from './errorAnalyzer.js';
import suggestions from './suggestionEngine.js';
import memory from '../system/sessionMemory.js';
import project from '../runtime/projectAnalyzer.js';
import { killProcessOnPort } from '../runtime/autoFix.js';
import { installDependencies } from '../runtime/packageManager.js';
import logger from '../system/logger.js';
import profiles from '../config/profiles.js';
import chalk from 'chalk';

/**
 * Autopilot Core
 * Autonomous system for real-time problem solving.
 */
class Autopilot {
    constructor() {
        this.enabled = false;
        this.activeProject = null;
    }

    async init() {
        const mem = await memory.getMemory();
        this.enabled = mem.autopilot;
        this.activeProject = await project.analyze();
        
        if (this.enabled) {
            logger.info('Autopilot System: ONLINE', { category: 'SYSTEM' });
        }
    }

    /**
     * Entry point for every log line
     */
    async processLog(level, message) {
        if (!this.enabled || level !== 'error') return;

        const profile = profiles.getProfile();
        const analysis = analyzer.analyze(message, profile);
        if (!analysis) return;

        await memory.logEvent('ISSUE_DETECTED', { issue: analysis.type, solution: analysis.solution });

        // Evaluate Confidence vs Profile Threshold
        if (analysis.isSafe && analysis.confidence >= profile.autoFixThreshold) {
            logger.info(`[AUTOPILOT] High Confidence (${(analysis.confidence * 100).toFixed(0)}%) for ${analysis.type}. Auto-fixing...`, { category: 'INTELLIGENCE' });
            suggestions.printAutoFix(`Applying Auto-Fix for ${analysis.type}`, analysis.reason);
            await this.autoFix(analysis);
        } else {
            logger.warn(`[AUTOPILOT] Low Confidence (${(analysis.confidence * 100).toFixed(0)}%) for ${analysis.type} or marked unsafe. Fallback to suggestion.`, { category: 'INTELLIGENCE' });
            const suggestion = suggestions.getSuggestion(analysis.type, analysis.solution, analysis.reason);
            if (suggestion) console.log(suggestion);
        }
    }

    async autoFix(analysis) {
        suggestions.printAutoFix(`Resolving ${analysis.type} automatically...`);
        
        try {
            switch(analysis.type) {
                case 'PORT_CONFLICT':
                    await killProcessOnPort(analysis.data.port);
                    suggestions.printAutoFix(`Port ${analysis.data.port} freed.`);
                    break;
                case 'MISSING_DEP':
                    installDependencies();
                    suggestions.printAutoFix(`Dependencies re-installed.`);
                    break;
            }
            await memory.recordFix(analysis.type, analysis.solution);
        } catch (error) {
            logger.error(`Autopilot Auto-Fix failed: ${error.message}`);
        }
    }

    setEnabled(status) {
        this.enabled = status;
        memory.saveMemory({ autopilot: status });
    }
}

const autopilot = new Autopilot();
export default autopilot;
