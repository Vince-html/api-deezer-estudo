import request from 'supertest';
import { app } from '../../src/server';
import { UseUsers } from '../../src/useCase/UseUsers';

describe('Auth route', () => {
  test('should return 400 when username or password is not informed', async () => {
    const response = await request(app).post('/auth').send({
      username: 'test',
    });

    expect(response.status).toBe(400);
  });
  test('should return 200 when username and password is informed', async () => {
    const response = await request(app).post('/auth').send({
      username: 'test',
      password: 'test',
    });

    expect(response.status).toBe(200);
  });
  test('should return 400 when username and password is informed', async () => {
    jest.spyOn(UseUsers.prototype, 'create').mockImplementationOnce(() => {
      throw new Error('Erro ao criar usuário');
    });
    const response = await request(app).post('/auth').send({
      username: 'test',
      password: 'test',
    });

    expect(response.status).toBe(400);
  });
  test('should return 400 when username and password is informed', async () => {
    jest
      .spyOn(UseUsers.prototype, 'create')
      .mockImplementationOnce(async () => {
        return new Error('Usuário já existe');
      });
    const response = await request(app).post('/auth').send({
      username: 'test',
      password: 'test',
    });

    expect(response.status).toBe(400);
  });
  test('get all', async () => {
    const response = await request(app).get('/auth');

    expect(response.status).toBe(200);
  });
  test('get by id and not found user', async () => {
    const response = await request(app).get('/auth').query({ id: '1' });

    expect(response.status).toBe(400);
  });
  test('put user and return 200', async () => {
    const response = await request(app).put('/auth').send({
      username: 'test',
      password: 'test',
    });

    expect(response.status).toBe(200);
  });
  test('put user and return 400', async () => {
    const response = await request(app).put('/auth').send({
      username: 'te2st',
      password: 'test',
    });

    expect(response.status).toBe(400);
  });
});
