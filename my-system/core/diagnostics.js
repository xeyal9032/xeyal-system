import om from './intelligence/ollamaManager.js';
import fs from 'fs';
import path from 'path';

const LARAVEL_CONTEXT = `STRICT ARCHITECTURAL REQUIREMENTS:
- Use Laravel 10 + Blade + Tailwind.
- Design: Use Vanilla JS, CSS, and HTML ONLY. NO build steps.
- UI BRIDGE: You MUST generate a brand new interactive 'index.html' (ROOT) with SPA navigation.
- CLEAN CODE: NO inline styles. Use internal <style> blocks.
- A11Y: Ensure labels and titles are present.
- NO TALKING. GENERATE NOW.`;

class ComplianceDiagnostic {
    constructor() {
        this.om = om;
        this.results = [];
    }

    async runAll() {
        console.log("\n--- 🛡️ XEYAL FORGE PRODUCTION COMPLIANCE START 🛡️ ---");
        
        await this.checkOllama();
        
        // --- COMPLIANCE STRESS TESTS ---
        await this.testFrameworkCompliance();
        await this.testCleanCodeCompliance();
        await this.testA11yCompliance();
        await this.testSPABridgeLogic();

        console.log("\n--- 📊 COMPLIANCE SUMMARY ---");
        this.results.forEach(r => {
            const icon = r.status === 'PASS' ? '✅' : (r.status === 'WARN' ? '⚠️' : '❌');
            console.log(`${icon} [${r.component}] ${r.message}`);
        });
        
        const failure = this.results.find(r => r.status === 'FAIL');
        if (failure) {
            console.log("\n🆘 STATUS: COMPLIANCE VIOLATION. AI is ignoring the new rules.");
        } else {
            console.log("\n🚀 STATUS: FULL COMPLIANCE. Forge is generating production-grade code.");
        }
        console.log("-------------------------------------------\n");
    }

    addResult(component, status, message) {
        this.results.push({ component, status, message });
    }

    async checkOllama() {
        try {
            await this.om.listModels();
            this.addResult('System', 'PASS', "Ollama Connection OK.");
        } catch (err) {
            this.addResult('System', 'FAIL', "Ollama Connection Failed.");
        }
    }

    async testFrameworkCompliance() {
        console.log("🚀 Testing Framework Compliance (No Build Steps)...");
        try {
            const prompt = `Create a complex Medical History page with charts.\n\nCONTEXT:\n${LARAVEL_CONTEXT}`;
            const response = await this.om.forgeChat(prompt, 'qwen2.5-coder:7b');
            
            const hasVueFile = response.includes('.vue') || response.includes('.jsx');
            const hasVite = response.toLowerCase().includes('vite') || response.toLowerCase().includes('webpack');

            if (!hasVueFile && !hasVite) {
                this.addResult('Framework', 'PASS', "AI is correctly using Vanilla JS (No build-step dependency).");
            } else {
                this.addResult('Framework', 'FAIL', "AI is still generating .vue/.jsx or using Vite (Build-step violation).");
            }
        } catch (err) {
            this.addResult('Framework', 'FAIL', err.message);
        }
    }

    async testCleanCodeCompliance() {
        console.log("📝 Testing Clean Code (No Inline Styles)...");
        try {
            const response = await this.om.forgeChat(`Create a styled button and a card.\n\nCONTEXT:\n${LARAVEL_CONTEXT}`, 'qwen2.5-coder:7b');
            
            // Check for style="..." attributes
            const hasInlineStyle = response.includes('style="') || response.includes("style='");

            if (!hasInlineStyle) {
                this.addResult('CleanCode', 'PASS', "AI is avoiding inline styles as commanded.");
            } else {
                this.addResult('CleanCode', 'FAIL', "AI used inline styles (Style violation).");
            }
        } catch (err) {
            this.addResult('CleanCode', 'FAIL', err.message);
        }
    }

    async testA11yCompliance() {
        console.log("♿ Testing Deep Accessibility (Label-ID Matching)...");
        try {
            const response = await this.om.forgeChat(`Generate a professional HTML snippet for a 'Service Description' field.\n\nCONTEXT:\n${LARAVEL_CONTEXT}`, 'qwen2.5-coder:7b');
            
            const hasLabel = response.includes('<label') && response.includes('for=');
            const hasId = response.includes('id=');
            
            // Check if label for="x" matches id="x"
            const labelMatch = response.match(/for=["'](.+?)["']/);
            const idMatch = response.match(/id=["'](.+?)["']/);
            const isMatched = labelMatch && idMatch && labelMatch[1] === idMatch[1];

            if (hasLabel && hasId && isMatched) {
                this.addResult('A11y', 'PASS', "AI is correctly linking labels to inputs via IDs.");
            } else {
                this.addResult('A11y', 'FAIL', "AI failed Label-ID matching or missed tags.");
                console.log("--- 🆘 DEBUG: FAILED A11Y RESPONSE ---");
                console.log(response);
                console.log("--------------------------------------");
            }
        } catch (err) {
            this.addResult('A11y', 'FAIL', err.message);
        }
    }

    async testSPABridgeLogic() {
        console.log("🔗 Testing SPA Bridge Navigation Logic...");
        try {
            const response = await this.om.forgeChat(`Generate index.html with Dashboard and Users navigation.\n\nCONTEXT:\n${LARAVEL_CONTEXT}`, 'qwen2.5-coder:7b');
            
            const hasNavLogic = response.includes('addEventListener') && response.includes('click');
            const hasViewSwitch = response.includes('display') || response.includes('classList.add');

            if (hasNavLogic && hasViewSwitch) {
                this.addResult('Navigation', 'PASS', "AI generated a functional SPA navigation bridge.");
            } else {
                this.addResult('Navigation', 'FAIL', "index.html is static and non-interactive.");
            }
        } catch (err) {
            this.addResult('Navigation', 'FAIL', err.message);
        }
    }
}

const diag = new ComplianceDiagnostic();
diag.runAll();
