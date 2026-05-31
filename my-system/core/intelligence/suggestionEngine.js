import chalk from 'chalk';

/**
 * Suggestion Engine
 * Beautifully formats autopilot insights.
 */
class SuggestionEngine {
    constructor() {
        this.history = new Map();
    }

    /**
     * Get a human-readable suggestion with root-cause insights
     */
    getSuggestion(type, solution, reason = null) {
        const count = (this.history.get(type) || 0) + 1;
        this.history.set(type, count);

        if (count > 2) return null; // Avoid spamming the same fix

        let msg = `\n${chalk.red.bold('❌ Error Detected:')} ${chalk.white(type)}\n`;
        if (reason) {
            msg += `${chalk.magenta.bold('🧠 Why:')} ${chalk.gray(reason)}\n`;
        }
        msg += `${chalk.cyan.bold('👉 Suggestion:')} run "${chalk.yellow(solution)}"\n`;
        
        return msg;
    }

    printAutoFix(msg, reason = null) {
        console.log(`\n${chalk.green.bold('[AUTOPILOT]')} ${chalk.white(msg)}`);
        if (reason) {
            console.log(`  ${chalk.magenta.bold('↳ Why:')} ${chalk.gray(reason)}`);
        }
    }


    clearHistory() {
        this.history.clear();
    }
}

const suggestionEngine = new SuggestionEngine();
export default suggestionEngine;
