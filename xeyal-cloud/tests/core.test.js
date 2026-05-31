import request from 'supertest';
import app from '../src/app.js';
import crypto from 'crypto';
import pg from 'pg';

// Mock PostgreSQL
jest.mock('pg', () => {
    const mPool = {
        query: jest.fn(),
        connect: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
});

describe('Xeyal Cloud Core API Tests', () => {
    let pool;
    const testApiKey = 'xeyal_test_key_123';
    const hashedKey = crypto.createHash('sha256').update(testApiKey).digest('hex');

    beforeAll(() => {
        pool = new pg.Pool();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Health Check should return 200', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('ok');
    });

    test('Error Ingestion should fail without API Key', async () => {
        const res = await request(app).post('/api/error').send({ errorMessage: 'Test' });
        expect(res.statusCode).toBe(401);
    });

    test('Error Ingestion should succeed with valid API Key', async () => {
        // Mock Auth query
        pool.query.mockResolvedValueOnce({
            rows: [{ id: 'key-id', user_id: 'user-id', email: 'test@xeyal.dev' }]
        });
        
        // Mock Insert query
        pool.query.mockResolvedValueOnce({
            rows: [{ id: 'error-id' }]
        });

        const res = await request(app)
            .post('/api/error')
            .set('X-Xeyal-API-Key', testApiKey)
            .send({
                projectName: 'Test App',
                errorMessage: 'ReferenceError: x is not defined',
                language: 'javascript'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.errorId).toBe('error-id');
    });

    test('Analysis endpoint should route to AI Engine', async () => {
        // Mock Auth
        pool.query.mockResolvedValueOnce({
            rows: [{ id: 'key-id', user_id: 'user-id' }]
        });

        // Mock Error Fetch
        pool.query.mockResolvedValueOnce({
            rows: [{ id: 'error-id', error_message: 'Test error', stack_trace: '', api_key_id: 'key-id' }]
        });

        // Mock Analysis Save
        pool.query.mockResolvedValueOnce({ rows: [] });

        const res = await request(app)
            .post('/api/analyze/error-id')
            .set('X-Xeyal-API-Key', testApiKey);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('reason');
        expect(res.body).toHaveProperty('confidence');
    });
});
