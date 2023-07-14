import request from 'supertest';
import { stopContainer } from '../../dockerintegrationstop';
import { app } from '../../src/server';
import { UseUsers } from '../../src/useCase/UseUsers';
import { sequelize } from '../../src/connect';
import { User } from '../../src/Models/user';

afterAll(async () => {
  await sequelize.close();

  // await stopContainer();
});
beforeEach(async () => {
  await sequelize.sync();
});
describe('Auth route', () => {
  test('should return 400 when username or password is not informed', async () => {
    const response = await request(app).post('/auth').send({
      username: 'test',
    });

    expect(response.status).toBe(400);
  });
  test('should return 200 when username and password is informed', async () => {
    await User.destroy({ where: { name: 'test' } });
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
