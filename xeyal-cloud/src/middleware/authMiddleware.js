import pg from 'pg';
import crypto from 'crypto';

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

/**
 * Middleware to validate API Keys
 */
export const validateApiKey = async (req, res, next) => {
    const apiKey = req.header('X-Xeyal-API-Key');

    if (!apiKey) {
        return res.status(401).json({ error: 'API Key is missing' });
    }

    try {
        // --- DEV BYPASS ---
        if (apiKey === 'xeyal_test_key_2026') {
            req.auth = {
                apiKeyId: '00000000-0000-0000-0000-000000000000',
                userId: '00000000-0000-0000-0000-000000000000',
                email: 'test@xeyal.com'
            };
            return next();
        }
        // ------------------

        // Hash the key to compare with DB
        const hashedKey = crypto.createHash('sha256').update(apiKey).digest('hex');

        const result = await pool.query(
            'SELECT ak.id, ak.user_id, u.email FROM api_keys ak JOIN users u ON ak.user_id = u.id WHERE ak.key_hash = $1 AND ak.is_active = TRUE',
            [hashedKey]
        );

        if (result.rows.length === 0) {
            return res.status(403).json({ error: 'Invalid or inactive API Key' });
        }

        // Attach auth info to request
        req.auth = {
            apiKeyId: result.rows[0].id,
            userId: result.rows[0].user_id,
            email: result.rows[0].email
        };

        // Log usage (asynchronous)
        pool.query(
            'INSERT INTO usage_logs (api_key_id, endpoint, status_code) VALUES ($1, $2, $3)',
            [req.auth.apiKeyId, req.originalUrl, 200]
        ).catch(err => console.error('Usage log error:', err));

        next();
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        res.status(500).json({ error: 'Authentication service error' });
    }
};
