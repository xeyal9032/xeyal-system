import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

test('Health Check should return 200', async () => {
    const res = await request(app).get('/health');
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.status, 'ok');
    assert.equal(res.body.engine, 'Hybrid AI');
});

test('Error Ingestion should fail without API Key', async () => {
    const res = await request(app).post('/api/error').send({ errorMessage: 'Test' });
    assert.equal(res.statusCode, 401);
});

test('Cloud status endpoint should respond', async () => {
    const res = await request(app).get('/api/cloud/status');
    assert.equal(res.statusCode, 200);
    assert.ok(res.body);
});

test('Stats endpoint should respond', async () => {
    const res = await request(app).get('/api/stats');
    assert.equal(res.statusCode, 200);
    assert.ok(typeof res.body === 'object');
});
