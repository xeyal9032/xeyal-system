/**
 * Config Profiles Engine
 * Configures the strictness, risk appetite, and logging verbosity of the Intelligent OS.
 */
class ConfigProfiles {
    constructor() {
        // Defaults to dev
        this.activeProfile = 'dev';
        
        this.profiles = {
            'dev': {
                autoFixThreshold: 0.80,   // Confidence must be >= 80% to auto-execute without asking
                allowUnknownFixes: false, // If the trust score is unknown, should we fix?
                throttleRestarts: true,   // High CPU throttles restarts
                logLevel: 'info',         // Surface normal info
                name: 'Development Mode'
            },
            'safe': {
                autoFixThreshold: 0.99,   // In safe mode, we only auto-execute 99%+ confidence actions
                allowUnknownFixes: false,
                throttleRestarts: true,
                logLevel: 'warn',         // Reduce noise, show only warnings/errors
                name: 'Safe Mode'
            },
            'aggressive': {
                autoFixThreshold: 0.50,   // Shoot first, ask questions later
                allowUnknownFixes: true,
                throttleRestarts: false,
                logLevel: 'debug',
                name: 'Aggressive / CI Mode'
            }
        };
    }

    getProfile() {
        return this.profiles[this.activeProfile];
    }

    setProfile(profileName) {
        if (!this.profiles[profileName]) {
            throw new Error(`Profile ${profileName} does not exist. Available: dev, safe, aggressive`);
        }
        this.activeProfile = profileName;
        return this.getProfile();
    }
}

const profiles = new ConfigProfiles();
export default profiles;
