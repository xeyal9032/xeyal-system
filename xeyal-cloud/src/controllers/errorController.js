import pg from 'pg';
import { v4 as uuidv4 } from 'uuid';
import chalk from 'chalk';

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// In-memory storage for Demo/Dev mode
export const mockErrors = [];

export const reportError = async (req, res) => {
    const { projectName, errorMessage, stackTrace, language, environment, metadata } = req.body;

    if (!errorMessage) {
        return res.status(400).json({ error: 'errorMessage is required' });
    }

    try {
        // --- DEV MOCK ---
        if (req.auth.email === 'test@xeyal.com') {
            console.log(chalk.cyan(`\n🧪 [DEV MOCK] Error Captured for project: ${projectName}`));
            console.log(chalk.gray(`   Message: ${errorMessage}`));
            
            const mockError = {
                id: uuidv4(),
                project_name: projectName,
                error_message: errorMessage,
                stack_trace: stackTrace,
                language: language,
                environment: environment,
                metadata: metadata,
                created_at: new Date().toISOString()
            };
            mockErrors.unshift(mockError); // Add to beginning
            if (mockErrors.length > 50) mockErrors.pop();

            return res.status(201).json({
                message: 'Error captured (Mock Mode)',
                errorId: mockError.id
            });
        }
        // ----------------

        // Simple grouping logic: Hash of project + error message
        const groupingId = `${projectName || 'unknown'}-${errorMessage.substring(0, 50)}`;

        const result = await pool.query(
            `INSERT INTO errors (api_key_id, project_name, error_message, stack_trace, language, environment, grouping_id, metadata)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
            [req.auth.apiKeyId, projectName, errorMessage, stackTrace, language, environment, groupingId, metadata || {}]
        );

        res.status(201).json({
            message: 'Error reported successfully',
            errorId: result.rows[0].id
        });
    } catch (error) {
        console.error('Report Error Controller:', error);
        res.status(500).json({ error: 'Failed to report error' });
    }
};

export const getErrors = async (req, res) => {
    try {
        // --- DEV BYPASS ---
        if (req.auth.email === 'test@xeyal.com') {
            return res.json(mockErrors);
        }
        // ------------------

        const result = await pool.query(
            'SELECT * FROM errors WHERE api_key_id = $1 ORDER BY created_at DESC LIMIT 50',
            [req.auth.apiKeyId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Get Errors Controller:', error);
        // Fallback to mock even if DB fails for other reasons in dev
        res.json(mockErrors);
    }
};
