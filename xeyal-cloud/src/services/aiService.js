import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class AIService {
    constructor() {
        this.localOllamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';
    }

    /**
     * Hybrid Routing Logic
     */
    async performHybridAnalysis(errorData) {
        console.log(`[AI Engine] Analyzing error: ${errorData.error_message.substring(0, 50)}...`);

        try {
            // 1. Attempt Local Analysis (Ollama)
            const localResult = await this.analyzeWithLocalAI(errorData);

            // 2. Decide if Fallback is needed (Threshold: 0.70 confidence)
            if (localResult && localResult.confidence >= 0.70) {
                console.log(`[AI Engine] Local AI satisfied (Conf: ${localResult.confidence})`);
                return { ...localResult, model: 'local-llama3' };
            }

            console.log(`[AI Engine] Local confidence low (${localResult?.confidence || 0}). Falling back to Cloud...`);

            // 3. Fallback to Cloud AI (OpenAI/Gemini)
            const cloudResult = await this.analyzeWithCloudAI(errorData);
            return { ...cloudResult, model: 'cloud-gpt4-o' };

        } catch (error) {
            console.error('[AI Engine] Hybrid process error:', error.message);
            throw error;
        }
    }

    /**
     * Local AI (Ollama) Implementation
     */
    async analyzeWithLocalAI(errorData) {
        try {
            const prompt = this.generatePrompt(errorData);
            
            // In a real production environment, the cloud server might not have access to the user's local Ollama.
            // This is a "Hybrid-Local" strategy where the CLI performs the local analysis and sends it, 
            // OR the Cloud server has its own powerful local models.
            // For this implementation, we assume the Cloud Server has access to a dedicated Ollama instance.
            
            const response = await axios.post(this.localOllamaUrl, {
                model: 'llama3',
                prompt: prompt,
                stream: false,
                format: 'json'
            }, { timeout: 10000 });

            return JSON.parse(response.data.response);
        } catch (e) {
            console.warn('[AI Engine] Local Ollama unavailable or timed out.');
            return { confidence: 0 };
        }
    }

    /**
     * Cloud AI Implementation
     */
    async analyzeWithCloudAI(errorData) {
        // Mocking Cloud API call for demonstration. 
        // In production, use OpenAI / Gemini SDK here.
        return {
            reason: "Detected a null pointer dereference in the authentication middleware.",
            explanation: "The 'user' object is being accessed before the database query completes, resulting in an undefined reference error.",
            fix: "Ensure you use 'await' or a '.then()' block before accessing properties of the result.",
            example_code: "const user = await pool.query(...);\nif (user) console.log(user.id);",
            confidence: 0.95
        };
    }

    generatePrompt(errorData) {
        const breadcrumbsText = errorData.metadata?.breadcrumbs?.map(b => 
            `[${b.timestamp}] (${b.category}/${b.level}) ${b.message}`
        ).join('\n') || 'No breadcrumbs available.';

        return `Analyze this software error and return a JSON response.
Error: ${errorData.error_message}
Stack Trace: ${errorData.stack_trace}
Language: ${errorData.language}

Recent Events (Breadcrumbs):
${breadcrumbsText}

Format your response as valid JSON:
{
  "reason": "short technical reason",
  "explanation": "detailed explanation considering the events leading to the error",
  "fix": "step-by-step fix",
  "example_code": "clean code snippet",
  "confidence": 0.0 to 1.0
}`;
    }
}

export default new AIService();
