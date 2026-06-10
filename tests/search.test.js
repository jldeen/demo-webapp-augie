const request = require('supertest');
const app = require('../src/index');

describe('GET /api/search', () => {
  it('returns 400 if no query provided', async () => {
    const res = await request(app).get('/api/search');
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('returns results for valid query', async () => {
    const res = await request(app).get('/api/search?q=test');
    expect(res.status).toBe(200);
    expect(res.body.query).toBe('test');
    expect(res.body.results).toBeInstanceOf(Array);
  });

  it('respects pagination parameters', async () => {
    const res = await request(app).get('/api/search?q=test&page=2&limit=10');
    expect(res.status).toBe(200);
    expect(res.body.page).toBe(2);
    expect(res.body.limit).toBe(10);
  });

  it('caps limit at 100', async () => {
    const res = await request(app).get('/api/search?q=test&limit=500');
    expect(res.status).toBe(200);
    expect(res.body.limit).toBe(100);
  });
});
