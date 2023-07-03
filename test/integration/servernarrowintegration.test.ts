import request from 'supertest';
import axios from 'axios';
import { app } from '../../src/server';
import { mock } from '../../src/mock/track';

axios.get = jest.fn().mockResolvedValue({
  data: {
    data: [mock],
  },
});
test('should return api', async () => {
  const response = await request(app)
    .get('/deezer')
    .query({ index: 1, limit: 1 });
  expect(response.status).toBe(200);
  const dataResponse = {
    data: [mock],
    total: [mock].length,
  };
  expect(response.body).toEqual(dataResponse);
});
test('should return error', async () => {
  const response = await request(app)
    .get('/deezer')
    .query({ index: 'teste', limit: 'teste' });

  expect(response.status).toBe(500);
});
