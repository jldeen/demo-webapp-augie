const request = require('supertest');
const app = require('../src/index');

describe('Users API', () => {
  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const res = await request(app).get('/api/users');
      expect(res.statusCode).toBe(200);
      expect(res.body.users).toBeInstanceOf(Array);
      expect(res.body.count).toBeGreaterThan(0);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a user by ID', async () => {
      const res = await request(app).get('/api/users/1');
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBeDefined();
    });

    it('should return 404 for non-existent user', async () => {
      const res = await request(app).get('/api/users/999');
      expect(res.statusCode).toBe(404);
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'Test User', email: 'test@example.com' });
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe('Test User');
    });

    it('should return 400 if name is missing', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ email: 'test@example.com' });
      expect(res.statusCode).toBe(400);
    });
  });
});
