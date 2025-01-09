const request = require('supertest');
const app = require('./index.js');

describe('Flow Distribution API', () => {
  it('should distribute user to an astrologer', async () => {
    const response = await request(app)
      .post('/api/v1/distribute-user')
      .send({ name: 'Balak456' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user.name).toBe('Balak456');
  });

  it('should return 400 if name is missing', async () => {
    const response = await request(app)
      .post('/api/v1/distribute-user')
      .send({}); // no name

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Name is required');
  });
});
