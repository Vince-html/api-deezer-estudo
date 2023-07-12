import request from 'supertest';
import axios from 'axios';
import { app } from '../../src/server';
import { mock } from '../../src/mock/track';
import { sequelize } from '../../src/connect';
afterAll(async () => {
  await sequelize.close();

  // await stopContainer();
});
beforeEach(async () => {
  await sequelize.sync();
});
axios.get = jest.fn().mockResolvedValue({
  data: {
    data: [mock],
    next: 'http://localhost:3001/search/?search=teste&index=1',
    prev: '',
    total: 1,
  },
});

test.each([
  ['teste', 200],
  [, 400],
])(
  'given search term %p, and expect result-code %p',
  async (stringTerm, resultCode) => {
    const response = await request(app)
      .get('/search')
      .query({ search: stringTerm, index: 1 });

    expect(response.status).toBe(resultCode);
  }
);

test('should return error', async () => {
  axios.get = jest
    .fn()
    .mockRejectedValue(new Error('Erro ao acessar a API do Deezer.'));
  const response = await request(app).get('/search').query({ search: 1 });
  expect(response.status).toBe(500);
});
