/**
 * Xeyal-Swarm: Swarm Demo
 * Testing the agent collaboration logic.
 */
import { BaseAgent } from './base-agent.js';
import { SwarmOrchestrator } from './orchestrator.js';

async function runSwarmDemo() {
    const swarm = new SwarmOrchestrator();

    // Initialize specialized agents
    const architect = new BaseAgent({ name: 'Mimar-Agent', role: 'Architect', model: 'gemini-1.5-pro' });
    const coder = new BaseAgent({ name: 'Kodcu-Agent', role: 'Coder', model: 'ollama/mistral' });
    const qa = new BaseAgent({ name: 'Testci-Agent', role: 'QA', model: 'ollama/codellama' });

    // Register them to the swarm
    swarm.registerAgent(architect);
    swarm.registerAgent(coder);
    swarm.registerAgent(qa);

    console.log('\n--- STARTING SWARM MISSION ---');
    const missionResult = await swarm.deployTask('Build a professional authentication module for Xeyal Cloud.');
    
    console.log('\n--- MISSION RESULTS ---');
    console.log(JSON.stringify(missionResult, null, 2));
}

runSwarmDemo().catch(console.error);
