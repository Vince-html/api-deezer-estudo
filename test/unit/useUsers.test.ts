import { User } from '../../src/interfaces';
import { UseUsers } from '../../src/useCase/UseUsers';
import { users } from '../../db';

describe('Create UseUsers', () => {
  test('create', async () => {
    const useUsers = new UseUsers();
    const user = await useUsers.create('user', 'password');

    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('id');
    expect(user).not.toHaveProperty('password');
  });

  test('create and findUser', async () => {
    const useUsers = new UseUsers();
    const user = await useUsers.create('user', 'password');

    expect(user).toBeInstanceOf(Error);
    expect(user).toStrictEqual(Error('Usuário já existe'));
  });
});
describe('Get UseUsers', () => {
  test('get by id', async () => {
    const useUsers = new UseUsers();
    const user = await useUsers.get(users[0].id);

    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('id');
    expect(user).not.toHaveProperty('password');
  });
  test('get by name', async () => {
    const useUsers = new UseUsers();
    const user = await useUsers.get(undefined, users[0].name);

    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('id');
    expect(user).not.toHaveProperty('password');
  });
  test('get all', async () => {
    const useUsers = new UseUsers();
    const user = await useUsers.get();

    expect(user).toBeInstanceOf(Array);
    expect(user).toStrictEqual([
      {
        name: users[0].name,
        id: users[0].id,
      },
    ]);
  });
  test('get by id and not found', async () => {
    const useUsers = new UseUsers();
    const user = await useUsers.get('id');

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
    const useUsers = new UseUsers();
    const user = await useUsers.login(users[0].name, 'password');

    expect(typeof user).toBe('string');
  });
  test('login and not found', async () => {
    const useUsers = new UseUsers();
    const user = await useUsers.login('name', 'password');

    expect(user).toBeInstanceOf(Error);
    expect(user).toStrictEqual(Error('Usuário não encontrado'));
  });
  test('login and password invalid', async () => {
    const useUsers = new UseUsers();
    const user = await useUsers.login(users[0].name, 'password2223');

    expect(user).toBeInstanceOf(Error);
    expect(user).toStrictEqual(Error('Senha inválida'));
  });
  test('login and invalid Token', async () => {
    const useUsers = new UseUsers();
    const user = await useUsers.login(users[0].name, 'password');

    expect(typeof user).toBe('string');
    expect(user).not.toBe('Token');
  });
});
