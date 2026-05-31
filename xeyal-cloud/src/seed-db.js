import pg from 'pg';
import crypto from 'crypto';

const pool = new pg.Pool({ 
    connectionString: process.env.DATABASE_URL 
});

async function seed() {
    console.log('🌱 Seeding database from INSIDE container...');
    try {
        const userResult = await pool.query(
            "INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET email=EXCLUDED.email RETURNING id",
            ['test@xeyal.dev', 'dummy_hash', 'Test User']
        );
        const userId = userResult.rows[0].id;

        const rawKey = 'xeyal_test_key_2026';
        const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');
        
        await pool.query(
            "INSERT INTO api_keys (user_id, key_hash, key_prefix, name) VALUES ($1, $2, $3, $4) ON CONFLICT (key_hash) DO NOTHING",
            [userId, keyHash, 'xeyal_te', 'Test Key']
        );

        console.log('✅ Success! API Key xeyal_test_key_2026 is ready.');
    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
    } finally {
        await pool.end();
        process.exit(0);
    }
}

seed();
