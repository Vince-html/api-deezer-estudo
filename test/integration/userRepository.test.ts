import { User } from '../../src/Models/user';

import { UserRepository } from '../../src/infra/user-repository';
import { Sequelize } from 'sequelize-typescript';

const userRepository = new UserRepository();

beforeEach(() => {
  const sequelize = new Sequelize({
    database: 'deezer',
    username: 'root',
    password: 'deezerapi123',
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  });

  sequelize.addModels([User]);
});
let idUser: number | undefined = undefined;
let user: User | null = null;
describe('Test user infra', () => {
  test('create', async () => {
    const user = {
      name: 'user',
      password: 'password',
    };
    await userRepository.create(user);
  });
  test('getByName', async () => {
    const userValues = await userRepository.getByName('user');
    expect(userValues).toHaveProperty('name');
    expect(userValues).toHaveProperty('id');
    expect(userValues?.name).toBe('user');
    user = userValues;
    idUser = userValues?.id;
  });
  test('update', async () => {
    const user = {
      id: idUser,
      name: 'user',
      password: 'password2',
    };
    await userRepository.update(user);
  });
  test('getAll', async () => {
    const allUser = await userRepository.getAll();

    expect(allUser).toBeInstanceOf(Array);
  });
  test('getById', async () => {
    if (idUser === undefined) return;
    const userById = await userRepository.getById(idUser);

    expect(userById?.id).toEqual(user?.id);
  });
  test('getById', async () => {
    const userById = await userRepository.getById(
      Math.floor(Math.random() * 1000) + 1
    );

    expect(userById).toEqual(null);
  });
  test('checkUserExist', async () => {
    const checkUserExist = await userRepository.checkExistsUser('user');
    expect(checkUserExist).toBe(true);
  });
  test('checkUserExist', async () => {
    const checkUserExist = await userRepository.checkExistsUser('userInvalido');
    expect(checkUserExist).toBe(false);
  });
  test('destroy user finally test', async () => {
    if (idUser === undefined) return;
    await userRepository.delete(idUser);
  });
});
