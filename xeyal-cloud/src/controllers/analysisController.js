import pg from 'pg';
import aiService from '../services/aiService.js';

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

/**
 * Controller to trigger AI analysis for a specific error
 */
export const analyzeError = async (req, res) => {
    const { errorId } = req.params;

    try {
        // 1. Fetch error details from DB
        const errorResult = await pool.query(
            'SELECT * FROM errors WHERE id = $1 AND api_key_id = $2',
            [errorId, req.auth.apiKeyId]
        );

        if (errorResult.rows.length === 0) {
            return res.status(404).json({ error: 'Error not found or access denied' });
        }

        const errorData = errorResult.rows[0];

        // 2. Perform Hybrid AI Analysis
        const analysis = await aiService.performHybridAnalysis(errorData);

        // 3. Save analysis result to DB
        await pool.query(
            `INSERT INTO analyses (error_id, reason, explanation, fix_suggestion, example_code, confidence, ai_model)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
                errorId, 
                analysis.reason, 
                analysis.explanation, 
                analysis.fix, 
                analysis.example_code, 
                analysis.confidence, 
                analysis.model
            ]
        );

        res.json(analysis);
    } catch (error) {
        console.error('Analyze Error Controller:', error);
        res.status(500).json({ error: 'AI analysis failed' });
    }
};
