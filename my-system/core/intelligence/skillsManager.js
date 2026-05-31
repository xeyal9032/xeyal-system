import { spawn } from 'child_process';
import logger from '../system/logger.js';
import chalk from 'chalk';

/**
 * Skills Manager
 * Manages specialized AI agents and integrations.
 */
class SkillsManager {
    constructor() {
        this.availableSkills = [
            { id: 'openclaw', name: 'OpenClaw', description: 'Personal AI with 100+ skills', type: 'agent' },
            { id: 'claude', name: 'Claude Code', description: "Anthropic's agentic coding tool", type: 'tool' },
            { id: 'codex', name: 'Codex', description: "OpenAI's coding assistant engine", type: 'model' },
            { id: 'opencode', name: 'OpenCode', description: "Anomaly's open-source agent", type: 'agent' },
            { id: 'droid', name: 'Droid', description: 'Factory coding agent (Terminal + IDE)', type: 'agent' },
            { id: 'pi', name: 'Pi Agent', description: 'Minimalist AI toolkit', type: 'toolkit' },
            { id: 'autogpt', name: 'AutoGPT', description: 'Semi-autonomous web-browsing agent', type: 'agent' },
            { id: 'agentgpt', name: 'AgentGPT', description: 'Interactive browser-based autonomous agent', type: 'agent' },
            { id: 'crewai', name: 'CrewAI', description: 'Multi-agent system role-playing orchestrator', type: 'framework' },
            { id: 'langchain', name: 'LangChain', description: 'Flexible LLM component bridging & tooling framework', type: 'framework' },
            { id: 'superagi', name: 'SuperAGI', description: 'Developer-first autonomous AI agent framework', type: 'framework' },
            { id: 'babyagi', name: 'BabyAGI', description: 'Task-driven cognitive autonomous agent loop', type: 'agent' },
            { id: 'opendevin', name: 'OpenDevin', description: 'An open-source autonomous software engineer', type: 'agent' },
            { id: 'metagpt', name: 'MetaGPT', description: 'Multi-agent software company role-play simulator', type: 'framework' },
            { id: 'gpt-engineer', name: 'GPT Engineer', description: 'One-prompt full-stack codebase builder', type: 'tool' },
            { id: 'devika', name: 'Devika AI', description: 'Open-source web-browsing AI software engineer', type: 'agent' }
        ];
        this.activeProcesses = new Map();
    }

    /**
     * List all available and recognized skills.
     */
    list(json = false) {
        if (json) {
            console.log('XEYAL_JSON_DATA_START');
            console.log(JSON.stringify(this.availableSkills, null, 2));
            console.log('XEYAL_JSON_DATA_END');
            return null;
        }
        return this.availableSkills;
    }

    /**
     * Launch a specific skill/agent via Ollama.
     */
    async launch(skillId) {
        const skill = this.availableSkills.find(s => s.id === skillId);
        if (!skill) throw new Error(`Skill ${skillId} not found.`);

        logger.info(`Launching Skill: ${skill.name}`);

        return new Promise((resolve, reject) => {
            const child = spawn('ollama', ['launch', skillId], {
                shell: true,
                stdio: 'pipe',
                detached: true
            });

            this.activeProcesses.set(skillId, child);

            child.stdout.on('data', (data) => {
                logger.info(`[SKILL:${skillId}] ${data.toString()}`);
            });

            child.stderr.on('data', (data) => {
                logger.error(`[SKILL:${skillId}] ${data.toString()}`);
            });

            child.on('error', (err) => {
                reject(err);
            });

            // Consider it launched if it doesn't crash in 2 seconds
            setTimeout(() => {
                resolve({ success: true, pid: child.pid });
            }, 2000);
        });
    }

    /**
     * Terminate an active skill.
     */
    stop(skillId) {
        const child = this.activeProcesses.get(skillId);
        if (child) {
            child.kill();
            this.activeProcesses.delete(skillId);
            return true;
        }
        return false;
    }
}

export default new SkillsManager();
