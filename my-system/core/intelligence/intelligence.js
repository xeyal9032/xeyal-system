import chalk from 'chalk';
import logger from '../system/logger.js';
import fs from 'fs-extra';
import path from 'path';
import ollamaManager from './ollamaManager.js';

/**
 * Intelligence Engine
 * Predicts fixes based on error patterns.
 */
class Intelligence {
    constructor() {
        this.errorDatabase = [
            {
                pattern: /CORS policy: No 'Access-Control-Allow-Origin'/,
                suggestion: () => `CORS error detected. Add "cors" middleware to your backend or use a proxy for local development.`,
                category: 'SECURITY'
            },
            {
                pattern: /SSL routines::wrong version number/i,
                suggestion: () => `SSL version mismatch. You might be trying to access an HTTPS port via HTTP or vice versa.`,
                category: 'SECURITY'
            },
            {
                pattern: /node_modules.*another process/,
                suggestion: () => `Lockfile detected. Another process (npm/yarn) is installing dependencies. Please wait or kill the existing process.`,
                category: 'SYSTEM'
            },
            {
                pattern: /index.lock' exists/,
                suggestion: () => `Git lock detected. Run "rm .git/index.lock" if you are sure no other git process is running.`,
                category: 'GIT'
            },
            {
                pattern: /Node.js version v(\d+).*required/,
                suggestion: (match) => `Node version mismatch. This project requires a different version. Run "nvm use" or update Node.`,
                category: 'RUNTIME'
            },
            {
                pattern: /FATAL ERROR: Ineffective mark-compacts near heap limit/,
                suggestion: () => `Memory leak or heap limit reached. Try increasing memory limit with "--max-old-space-size=4096".`,
                category: 'PERFORMANCE'
            },
            {
                pattern: /No application encryption key has been specified/i,
                suggestion: () => `Laravel security error. Run "php artisan key:generate" to set your APP_KEY in the .env file.`,
                category: 'SECURITY'
            },
            {
                pattern: /SQLSTATE\[HY000\] \[2002\] Connection refused/i,
                suggestion: () => `Database connection failed. Check if your DB service (MySQL/PostgreSQL) is running and verify DB_HOST in .env.`,
                category: 'DATABASE'
            },
            {
                pattern: /Class .*not found/i,
                suggestion: () => `Autoloading issue detected. Run "composer dump-autoload" or check if the package is installed via "composer install".`,
                category: 'RUNTIME'
            }
        ];

        this.recentErrors = new Map(); // For repetition detection
    }

    /**
     * Analyze an error string and return a suggestion if found.
     */
    analyze(errorMessage) {
        // Track repetition
        const count = (this.recentErrors.get(errorMessage) || 0) + 1;
        this.recentErrors.set(errorMessage, count);

        for (const entry of this.errorDatabase) {
            const match = errorMessage.match(entry.pattern);
            if (match) {
                const suggestion = entry.suggestion(match);
                this.printSuggestion(suggestion, count >= 3);
                return { suggestion, category: entry.category, isRepetitive: count >= 3 };
            }
        }

        // AI Fallback if no local patterns match
        return this.analyzeWithAI(errorMessage, count >= 3);
    }

    /**
     * Fallback to local AI for unknown errors.
     */
    async analyzeWithAI(errorMessage, isRepetitive) {
        if (!ollamaManager.isInstalled()) return null;

        const aiAdvice = await ollamaManager.analyzeError(errorMessage);
        if (aiAdvice) {
            this.printSuggestion(aiAdvice + " (AI Generated)", isRepetitive);
            return { suggestion: aiAdvice, category: 'AI_INSIGHT', isRepetitive };
        }
        return null;
    }

    printSuggestion(msg, isUrgent) {
        // Prevent pollution in JSON mode
        if (process.argv.includes('--json')) return;

        console.log('\n' + chalk.cyan.bold('🧠 INTELLIGENCE SUGGESTION:'));
        console.log(chalk.white(`   ${msg}`));
        if (isUrgent) {
            console.log(chalk.red.italic('   (This error has occurred multiple times in this session)'));
        }
        console.log('');
    }
    /**
     * Deep Scan a project's files for code-level issues.
     */
    async deepScan(projectPath) {
        const issues = [];
        try {
            // High-level checks
            if (!await fs.pathExists(path.join(projectPath, 'node_modules'))) {
                issues.push({ file: 'Root', type: 'CRITICAL', msg: 'node_modules is missing! Run "npm install" before starting.' });
            }

            if (!await fs.pathExists(path.join(projectPath, '.env')) && await fs.pathExists(path.join(projectPath, '.env.example'))) {
                issues.push({ file: 'Root', type: 'WARNING', msg: '.env file not found, but .env.example exists. Copy it to avoid runtime errors.' });
            }

            if (!await fs.pathExists(path.join(projectPath, 'README.md'))) {
                issues.push({ file: 'Root', type: 'BEST_PRACTICE', msg: 'Project is missing a README.md. Documentation is key!' });
            }

            const files = await this.getAllFiles(projectPath);
            for (const file of files) {
                if (file.endsWith('.js') || file.endsWith('.json')) {
                    const content = await fs.readFile(file, 'utf8');
                    
                    if (content.includes('console.log')) {
                        issues.push({ 
                            file: path.relative(projectPath, file), 
                            type: 'BEST_PRACTICE', 
                            msg: 'Production-ready code should avoid console.log statements.' 
                        });
                    }

                    if (content.match(/password|secret|key|api_key/i)) {
                        issues.push({ 
                            file: path.relative(projectPath, file), 
                            type: 'SECURITY', 
                            msg: 'Potential hardcoded secret or sensitive keyword detected.' 
                        });
                    }

                    if (content.match(/var\s+/)) {
                        issues.push({ 
                            file: path.relative(projectPath, file), 
                            type: 'STYLE', 
                            msg: 'Use "let" or "const" instead of "var" for better scoping.' 
                        });
                    }
                }
            }
        } catch (error) {
            logger.error(`Deep scan failed: ${error.message}`);
        }
        return issues;
    }

    async getAllFiles(dirPath, arrayOfFiles = []) {
        const files = await fs.readdir(dirPath);
        for (const file of files) {
            if ((await fs.stat(path.join(dirPath, file))).isDirectory()) {
                if (file !== 'node_modules' && file !== '.git') {
                    arrayOfFiles = await this.getAllFiles(path.join(dirPath, file), arrayOfFiles);
                }
            } else {
                arrayOfFiles.push(path.join(dirPath, file));
            }
        }
        return arrayOfFiles;
    }

    /**
     * Deep explanation of an error.
     */
    async explain(errorInput) {
        const patterns = [
            {
                id: 'PORT_CONFLICT',
                regex: /EADDRINUSE/,
                explanation: "This error occurs because another process is already listening on the requested port. In Node.js, each port can only be handled by one server at a time.",
                prevention: "Always use 'my-system status' to check for active ports before starting a server, or use safe shutdown hooks."
            },
            {
                id: 'MODULE_NOT_FOUND',
                regex: /Cannot find module/,
                explanation: "The Node.js runtime cannot locate the package you're trying to import. This usually means it hasn't been installed in node_modules.",
                prevention: "Ensure you run 'npm install' after pulling new code or adding a dependency to package.json."
            }
        ];

        for (const p of patterns) {
            if (errorInput.match(p.regex)) {
                return {
                    title: p.id,
                    explanation: p.explanation,
                    prevention: p.prevention
                };
            }
        }

        return {
            title: "UNKNOWN_ERROR",
            explanation: "I haven't encountered this specific pattern yet, but I've logged it for future learning.",
            prevention: "Check official documentation for this specific error code."
        };
    }
}

const intelligence = new Intelligence();
export default intelligence;
