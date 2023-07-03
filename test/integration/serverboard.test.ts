import request from 'supertest';

import { app } from '../../src/server';

test('should return api', async () => {
  const response = await request(app).get('/deezer');
  expect(response.status).toBe(200);
});
test('should return api', async () => {
  const response = await request(app)
    .get('/deezer')
    .query({ index: 'teste', limit: 'teste' });
  expect(response.status).toBe(500);
});
