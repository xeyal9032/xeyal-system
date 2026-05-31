/**
 * Error Analyzer
 * Translates terminal chaos into actionable data.
 */
class ErrorAnalyzer {
    constructor() {
        this.patterns = [
            {
                id: 'PORT_CONFLICT',
                regex: /EADDRINUSE.*:(\d+)/,
                extractor: (m) => ({ port: m[1] }),
                solution: (data) => `my-system fix ${data.port}`,
                actionCode: 'ACTION_KILL_PORT',
                safeAutoFix: true,
                evalConfidence: (data, profile) => {
                    // With a port conflict, we need to find what's blocking it. 
                    // Trust scoring will be evaluated externally in autoFix.js but initially:
                    return 0.90; // High default confidence
                },
                getReason: (data) => `Port ${data.port} is already blocked by another process. For development, this needs to be closed or the app needs a new port.`
            },
            {
                id: 'MISSING_DEP',
                regex: /Cannot find (?:module|package) '(.+)'/,
                extractor: (m) => ({ module: m[1] }),
                solution: () => `my-system install`,
                actionCode: 'ACTION_INSTALL_DEP',
                safeAutoFix: true,
                evalConfidence: () => 0.95, // Installing deps is very safe
                getReason: (data) => `Module '${data.module}' is missing in node_modules. This happens if dependencies were not installed.`
            },
            {
                id: 'CRASH',
                regex: /process exited with code ([1-9]\d*)/,
                extractor: (m) => ({ code: m[1] }),
                solution: () => `my-system dev`,
                actionCode: 'ACTION_RESTART',
                safeAutoFix: false, // Dangerous to auto-restart blindly
                evalConfidence: () => 0.30, // Low confidence
                getReason: (data) => `The process crashed with exit code ${data.code}. Restarting it might keep crashing if the root cause isn't fixed.`
            }
        ];
    }

    /**
     * Trust Scoring evaluates known processes
     */
    evaluateTrust(processName) {
        if (!processName) return { status: 'UNKNOWN', score: 0.5 };
        const safeProcesses = ['node.exe', 'python.exe', 'java.exe', 'ruby.exe', 'nginx.exe', 'docker.exe'];
        const criticalProcesses = ['svchost.exe', 'system', 'explorer.exe', 'wininit.exe', 'csrss.exe'];

        const lowerName = processName.toLowerCase();
        
        if (safeProcesses.some(sp => lowerName.includes(sp))) {
            return { status: 'SAFE', score: 0.9 };
        }
        if (criticalProcesses.some(cp => lowerName.includes(cp))) {
            return { status: 'CRITICAL', score: 0.0 }; // NEVER kill
        }
        
        return { status: 'UNKNOWN', score: 0.4 };
    }

    analyze(line, profile = null) {
        for (const p of this.patterns) {
            const match = line.match(p.regex);
            if (match) {
                const data = p.extractor(match);
                const confidence = p.evalConfidence ? p.evalConfidence(data, profile) : 0.5;
                const reason = p.getReason ? p.getReason(data) : 'Unknown system reason.';
                return {
                    type: p.id,
                    data,
                    solution: p.solution(data),
                    actionCode: p.actionCode,
                    isSafe: p.safeAutoFix,
                    confidence,
                    reason
                };
            }
        }
        return null;
    }
}

const errorAnalyzer = new ErrorAnalyzer();
export default errorAnalyzer;
