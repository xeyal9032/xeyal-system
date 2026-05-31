import aiService from '../src/services/aiService.js';
import chalk from 'chalk';

async function testAIHybridRouting() {
    console.log(chalk.blue.bold('\n🧪 Testing AI Hybrid Routing Engine...\n'));

    const mockError = {
        error_message: "TypeError: Cannot read properties of undefined (reading 'name')",
        stack_trace: "at App.jsx:42\nat Object.render",
        language: "javascript"
    };

    try {
        console.log(chalk.white('Scenario 1: Full Hybrid Flow'));
        const result = await aiService.performHybridAnalysis(mockError);
        
        console.log(chalk.green('✅ Analysis Received:'));
        console.log(chalk.gray('   Model Used:'), chalk.cyan(result.model));
        console.log(chalk.gray('   Reason:'), result.reason);
        console.log(chalk.gray('   Confidence:'), result.confidence);

        if (result.confidence > 0.9) {
            console.log(chalk.green.bold('\n✨ PASS: Engine returned high-confidence result.'));
        } else {
            console.log(chalk.yellow('\n⚠️  WARN: Confidence lower than expected, check AI prompts.'));
        }

    } catch (error) {
        console.error(chalk.red('\n❌ FAIL: AI Engine crashed during test.'), error.message);
    }
}

testAIHybridRouting();
