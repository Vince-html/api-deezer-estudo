import { UseUsers } from '../../src/useCase/UseUsers';
import { User } from '../../src/Models/user';
import bcrypt from 'bcrypt';
describe('Create UseUsers', () => {
  test('create', async () => {
    const findAllSpy = jest.spyOn(User, 'findAll');
    const spyCreate = jest.spyOn(User, 'create');

    findAllSpy.mockResolvedValue([]);
    spyCreate.mockResolvedValue({
      name: 'user',
      password: 'password',
      id: 1,
    } as unknown as User);

    const useUsers = new UseUsers();
    const user = await useUsers.create('user', 'password');

    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('id');
    expect(user).not.toHaveProperty('password');
  });

  test('create and findUser', async () => {
    const findAllSpy = jest.spyOn(User, 'findAll');

    findAllSpy.mockResolvedValue([
      {
        name: 'user',
        password: 'password',
        id: 1,
      } as unknown as User,
    ]);
    const useUsers = new UseUsers();
    const user = await useUsers.create('user', 'password');

    expect(user).toBeInstanceOf(Error);
    expect(user).toStrictEqual(Error('Usuário já existe'));
  });
});
describe('Get UseUsers', () => {
  test('get by id', async () => {
    const useUsers = new UseUsers();
    const user = await useUsers.get(1);

    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('id');
    expect(user).not.toHaveProperty('password');
  });
  test('get by name', async () => {
    const useUsers = new UseUsers();
    const user = await useUsers.get(undefined, 'user');

    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('id');
    expect(user).not.toHaveProperty('password');
  });
  test('get all', async () => {
    const useUsers = new UseUsers();
    const user = await useUsers.get();

    expect(user).toBeInstanceOf(Array);
  });
  test('get by id and not found', async () => {
    const useUsers = new UseUsers();
    const user = await useUsers.get(2);

    expect(user).toBeInstanceOf(Error);
    expect(user).toStrictEqual(Error('Usuário não encontrado'));
  });
  test('get by id and not found', async () => {
    const useUsers = new UseUsers();
    const user = await useUsers.get(undefined, 'name22');

    expect(user).toBeInstanceOf(Error);
    expect(user).toStrictEqual(Error('Usuário não encontrado'));
  });
});
describe('Login UseUsers', () => {
  test('login', async () => {
    const findAllSpy = jest.spyOn(bcrypt, 'compare');

    findAllSpy.mockImplementation(() => Promise.resolve(true));
    const useUsers = new UseUsers();
    const user = await useUsers.login('user', 'password');

    expect(typeof user).toBe('string');
  });
  test('login and not found', async () => {
    const useUsers = new UseUsers();
    const user = await useUsers.login('name', 'password');

    expect(user).toBeInstanceOf(Error);
    expect(user).toStrictEqual(Error('Usuário não encontrado'));
  });
  test('login and not found', async () => {
    const findAllSpy = jest.spyOn(User, 'findAll');

    findAllSpy.mockResolvedValue([
      {
        name: 'user',
        password: 'password',
        id: false,
      } as unknown as User,
    ]);
    const useUsers = new UseUsers();
    const user = await useUsers.login('name', 'password');

    expect(user).toBeInstanceOf(Error);
    expect(user).toStrictEqual(Error('Usuário não encontrado'));
  });
  test('login and password invalid', async () => {
    const findAllSpy = jest.spyOn(bcrypt, 'compare');

    findAllSpy.mockImplementation(() => Promise.resolve(false));
    const useUsers = new UseUsers();
    const user = await useUsers.login('user', 'password2223');

    expect(user).toBeInstanceOf(Error);
    expect(user).toStrictEqual(Error('Senha inválida'));
  });
});
