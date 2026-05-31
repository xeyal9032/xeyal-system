/**
 * System Profiles Configuration
 * Defines behavioral thresholds and limits for the Autonomous Engine.
 */
class Profiles {
    constructor() {
        this.activeProfile = 'default';
        this.profiles = {
            default: {
                name: 'Default Developer',
                autoFixThreshold: 0.7, // Confidence required to apply fix automatically
                resourceCap: 80,       // CPU percentage limit
                safetyMode: true       // Enable additional verification steps
            },
            aggressive: {
                name: 'Aggressive Auto-Heal',
                autoFixThreshold: 0.4,
                resourceCap: 95,
                safetyMode: false
            },
            conservative: {
                name: 'Conservative Monitor',
                autoFixThreshold: 0.9,
                resourceCap: 50,
                safetyMode: true
            }
        };
    }

    getProfile() {
        return this.profiles[this.activeProfile] || this.profiles.default;
    }

    setProfile(name) {
        if (this.profiles[name]) {
            this.activeProfile = name;
        }
    }
}

const profiles = new Profiles();
export default profiles;
