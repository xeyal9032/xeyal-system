import pg from 'pg';
import crypto from 'crypto';

const connectionStrings = [
    'postgres://xeyal_admin:secure_password_123@127.0.0.1:5432/xeyal_cloud',
    'postgres://postgres:secure_password_123@127.0.0.1:5432/xeyal_cloud',
    'postgres://postgres@127.0.0.1:5432/postgres'
];

async function seed() {
    let pool;
    console.log('🌱 Seeding database with test data...');
    
    // Try to connect with available credentials
    for (const conn of connectionStrings) {
        try {
            pool = new pg.Pool({ connectionString: conn });
            await pool.query('SELECT 1'); // Test connection
            console.log(`📡 Connected using: ${conn.split('@')[0]}...`);
            break;
        } catch (e) {
            await pool.end();
            pool = null;
        }
    }

    if (!pool) {
        console.error('❌ Error: Could not connect to any PostgreSQL instance. Please ensure Docker is running.');
        process.exit(1);
    }
    try {
        // 1. Create Test User
        const userResult = await pool.query(
            "INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET email=EXCLUDED.email RETURNING id",
            ['test@xeyal.dev', 'dummy_hash', 'Test User']
        );
        const userId = userResult.rows[0].id;

        // 2. Create Test API Key
        const rawKey = 'xeyal_test_key_2026';
        const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');
        
        await pool.query(
            "INSERT INTO api_keys (user_id, key_hash, key_prefix, name) VALUES ($1, $2, $3, $4) ON CONFLICT (key_hash) DO NOTHING",
            [userId, keyHash, 'xeyal_te', 'Test Key']
        );

        console.log('✅ Success! Test API Key created: xeyal_test_key_2026');
    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
    } finally {
        await pool.end();
        process.exit(0);
    }
}

seed();
