import axios from 'axios';
import os from 'os';
import * as stackTraceParser from 'stacktrace-parser';

class XeyalSDK {
    constructor() {
        this.apiKey = null;
        this.apiUrl = 'http://localhost:4000/api';
        this.projectName = 'Unknown Project';
        this.initialized = false;
        
        // Metadata & Context
        this.breadcrumbs = [];
        this.maxBreadcrumbs = 30;
        this.user = null;
        this.tags = {};
        this.timers = new Map();
        
        this.plugins = [];
    }

    /**
     * Initialize the SDK
     */
    init(options = {}) {
        this.apiKey = options.apiKey || process.env.XEYAL_API_KEY;
        
        if (!this.apiKey) {
            console.error('[Xeyal SDK] Error: API Key is required.');
            return;
        }

        this.apiUrl = options.apiUrl || this.apiUrl;
        this.projectName = options.projectName || process.env.npm_package_name || 'Node App';
        this.initialized = true;

        if (options.autoCapture !== false) {
            this._setupGlobalHandlers();
        }

        // Auto-load built-in plugins if requested
        if (options.plugins?.console !== false) {
            this.use(this.createConsolePlugin());
        }

        this.addBreadcrumb('SDK Initialized', 'system');
        console.log(`[Xeyal SDK] v2.1 Initialized for: ${this.projectName}`);
    }

    /**
     * Register a plugin
     */
    use(plugin) {
        if (typeof plugin.init === 'function') {
            plugin.init(this);
            this.plugins.push(plugin);
        }
    }

    _setupGlobalHandlers() {
        process.on('uncaughtException', (error) => {
            this.captureError(error, { severity: 'FATAL', type: 'uncaughtException' }).then(() => {
                process.exit(1);
            });
        });

        process.on('unhandledRejection', (reason) => {
            this.captureError(reason, { severity: 'WARNING', type: 'unhandledRejection' });
        });
    }

    /**
     * Add a breadcrumb
     */
    addBreadcrumb(message, category = 'default', level = 'info', data = null) {
        const breadcrumb = {
            timestamp: new Date().toISOString(),
            message,
            category,
            level,
            data
        };
        this.breadcrumbs.push(breadcrumb);
        if (this.breadcrumbs.length > this.maxBreadcrumbs) {
            this.breadcrumbs.shift();
        }
    }

    setUser(user) { this.user = user; }
    setTag(key, value) { this.tags[key] = value; }
    startTimer(name) { this.timers.set(name, Date.now()); }
    
    endTimer(name) {
        const start = this.timers.get(name);
        if (start) {
            const duration = Date.now() - start;
            this.timers.delete(name);
            this.addBreadcrumb(`Performance: ${name} took ${duration}ms`, 'performance', 'info', { duration });
            return duration;
        }
        return -1;
    }

    /**
     * Capture Error
     */
    async captureError(error, extraContext = {}) {
        if (!this.initialized) return;

        const errorMessage = error instanceof Error ? error.message : String(error);
        const stackTrace = error instanceof Error ? error.stack : '';
        const parsedStack = stackTraceParser.parse(stackTrace);
        const firstFrame = parsedStack[0] || {};

        const payload = {
            projectName: this.projectName,
            errorMessage,
            stackTrace,
            language: 'javascript/nodejs',
            environment: {
                os: os.type(),
                nodeVersion: process.version,
                hostname: os.hostname(),
                file: firstFrame.file,
                line: firstFrame.lineNumber
            },
            metadata: {
                breadcrumbs: this.breadcrumbs,
                user: this.user,
                tags: { ...this.tags, ...extraContext.tags },
                severity: extraContext.severity || 'ERROR',
                type: extraContext.type || 'manual'
            }
        };

        try {
            const response = await axios.post(`${this.apiUrl}/error`, payload, {
                headers: { 'X-Xeyal-API-Key': this.apiKey },
                timeout: 5000
            });
            return response.data.errorId;
        } catch (err) {
            let detail = err.message;
            if (err.code === 'ECONNREFUSED') detail = 'Cloud server unreachable.';
            console.error(`[Xeyal SDK] Reporting failed: ${detail}`);
        }
    }

    /**
     * Built-in: Console Plugin
     */
    createConsolePlugin() {
        return {
            name: 'console-plugin',
            init: (sdk) => {
                const originalConsole = {
                    log: console.log,
                    warn: console.warn,
                    error: console.error
                };

                console.log = (...args) => {
                    sdk.addBreadcrumb(args.map(String).join(' '), 'console', 'info');
                    originalConsole.log.apply(console, args);
                };

                console.warn = (...args) => {
                    sdk.addBreadcrumb(args.map(String).join(' '), 'console', 'warn');
                    originalConsole.warn.apply(console, args);
                };

                console.error = (...args) => {
                    sdk.addBreadcrumb(args.map(String).join(' '), 'console', 'error');
                    originalConsole.error.apply(console, args);
                };
            }
        };
    }
}

export default new XeyalSDK();
