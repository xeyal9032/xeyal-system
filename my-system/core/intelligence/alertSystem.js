import notifier from 'node-notifier';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Alert System
 * Manages OS-level notifications and audible alerts.
 */
class AlertSystem {
    /**
     * Trigger a categorized notification
     * @param {string} level - 'warn' (Yellow) or 'error' (Red)
     * @param {string} title - notification title
     * @param {string} message - notification message
     */
    notify(level, title, message) {
        const isFatal = level === 'error';
        
        notifier.notify({
            title: isFatal ? `🚫 FATAL: ${title}` : `⚠️ WARNING: ${title}`,
            message: message,
            sound: true, // Plays default system sound
            wait: isFatal, // Wait for user interaction if fatal
            timeout: isFatal ? 10 : 5
        });

        // Add a console beep for fatal errors as backup
        if (isFatal) {
            process.stdout.write('\x07');
        }
    }
}

const alertSystem = new AlertSystem();
export default alertSystem;
