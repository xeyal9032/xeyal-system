import pg from 'pg';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { tempKeys } from '../app.js';

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const register = async (req, res) => {
    const { email, password, fullName } = req.body;
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING id, email',
            [email, passwordHash, fullName]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};

export const login = async (req, res) => {
    // Basic login logic for MVP
    res.json({ message: 'Login endpoint ready' });
};

export const generateKey = async (req, res) => {
    const userId = req.auth?.userId || '00000000-0000-0000-0000-000000000000';
    const { name } = req.body;

    try {
        const rawKey = `xeyal_${crypto.randomBytes(16).toString('hex')}`;
        const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');
        const keyPrefix = rawKey.substring(0, 8);

        try {
            await pool.query(
                'INSERT INTO api_keys (user_id, key_hash, key_prefix, name) VALUES ($1, $2, $3, $4)',
                [userId, keyHash, keyPrefix, name || 'New Key']
            );
            
            res.status(201).json({ 
                apiKey: rawKey,
                message: 'API Key generated and stored successfully.'
            });
        } catch (dbError) {
            console.warn('⚠️ DB Offline: Returning session-only API Key.');
            const newKey = { 
                name: name || 'New Key (Temp)', 
                prefix: keyPrefix, 
                created: new Date().toISOString().split('T')[0], 
                status: 'ACTIVE' 
            };
            tempKeys.unshift(newKey); // Add to top of the memory list

            res.status(201).json({ 
                apiKey: `${rawKey}_temp`,
                message: 'API Key generated in SESSION-ONLY mode (Database Offline).'
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Critical failure in key generation' });
    }
};
