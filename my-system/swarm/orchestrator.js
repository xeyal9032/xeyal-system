/**
 * Xeyal-Swarm: Orchestrator
 * The central brain that manages multiple agents.
 */
import { BaseAgent } from './base-agent.js';

export class SwarmOrchestrator {
    constructor() {
        this.agents = new Map();
        this.taskQueue = [];
        this.history = [];
    }

    registerAgent(agent) {
        this.agents.set(agent.id, agent);
        console.log(`[ORCHESTRATOR] Agent registered: ${agent.name} (${agent.role})`);
    }

    async deployTask(taskDescription) {
        console.log(`[ORCHESTRATOR] Deploying complex task: ${taskDescription}`);
        
        // Phase 1: Planning (The Orchestrator acts as the Lead Architect)
        const plan = await this.createPlan(taskDescription);
        
        // Phase 2: Execution (Delegating to agents)
        const results = [];
        for (const step of plan) {
            const agent = this.findBestAgentFor(step.role);
            if (agent) {
                const result = await agent.think(step.action);
                results.push({ step: step.id, result });
            }
        }

        return { status: 'COMPLETED', plan, results };
    }

    async createPlan(task) {
        // Mocking an AI-generated plan for now
        return [
            { id: 1, role: 'Architect', action: 'Design the project structure' },
            { id: 2, role: 'Coder', action: 'Implement the base logic' },
            { id: 3, role: 'QA', action: 'Run security and bug tests' }
        ];
    }

    findBestAgentFor(role) {
        return Array.from(this.agents.values()).find(a => a.role === role);
    }
}
