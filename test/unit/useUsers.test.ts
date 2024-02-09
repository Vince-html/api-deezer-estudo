import { UseUsers } from '../../src/useCase/UseUsers';
import { User } from '../../src/Models/user';
import bcrypt from 'bcrypt';

const MockUserRepository = jest.fn(() => ({
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getByName: jest.fn(),
  getAll: jest.fn(),
  checkExistsUser: jest.fn(),
}));

const userRepository = MockUserRepository();

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

    const spyCreateRepository = jest.spyOn(userRepository, 'create');
    spyCreateRepository.mockResolvedValue(true);
    const useUsers = new UseUsers(userRepository);
    const user = await useUsers.create('user', 'password');

    expect(user).toBe('Usuário criado com sucesso');
  });
  test('create and return error', async () => {
    const spyCreateRepository = jest.spyOn(userRepository, 'create');
    spyCreateRepository.mockRejectedValue(new Error('error'));
    const useUsers = new UseUsers(userRepository);
    const user = await useUsers.create('user', 'password');
    expect(user).toBeInstanceOf(Error);
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

    const spyCreateRepository = jest.spyOn(userRepository, 'checkExistsUser');
    spyCreateRepository.mockResolvedValue(true);
    const useUsers = new UseUsers(userRepository);
    const user = await useUsers.create('user', 'password');

    expect(user).toBeInstanceOf(Error);
    expect(user).toStrictEqual(Error('Usuário já existe'));
  });
});
describe('Get UseUsers', () => {
  test('get by id', async () => {
    const spyCreateRepository = jest.spyOn(userRepository, 'getById');
    spyCreateRepository.mockResolvedValue({
      name: 'user',
      id: 1,
    } as unknown as User);
    const useUsers = new UseUsers(userRepository);
    const user = await useUsers.get(1);

    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('id');
    expect(user).not.toHaveProperty('password');
  });
  test('get by name', async () => {
    const spyCreateRepository = jest.spyOn(userRepository, 'getByName');
    spyCreateRepository.mockResolvedValue({
      name: 'user',
      id: 1,
    } as unknown as User);
    const useUsers = new UseUsers(userRepository);
    const user = await useUsers.get(undefined, 'user');

    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('id');
    expect(user).not.toHaveProperty('password');
  });
  test('get all', async () => {
    const spyCreateRepository = jest.spyOn(userRepository, 'getAll');
    spyCreateRepository.mockResolvedValue([
      {
        name: 'user',
        id: 1,
      },
    ]);
    const useUsers = new UseUsers(userRepository);

    const user = await useUsers.get();

    expect(user).toBeInstanceOf(Array);
  });
  test('get all and return error', async () => {
    const spyCreateRepository = jest.spyOn(userRepository, 'getAll');
    spyCreateRepository.mockRejectedValue(new Error('error'));
    const useUsers = new UseUsers(userRepository);

    const user = await useUsers.get();

    expect(user).toBeInstanceOf(Error);
  });
  test('get by id and not found', async () => {
    const spyCreateRepository = jest.spyOn(userRepository, 'getById');
    spyCreateRepository.mockResolvedValue(null);
    const useUsers = new UseUsers(userRepository);
    const user = await useUsers.get(2);

    expect(user).toBeInstanceOf(Error);
    expect(user).toStrictEqual(Error('Usuário não encontrado'));
  });
  test('get by name and not found', async () => {
    const spyCreateRepository = jest.spyOn(userRepository, 'getByName');
    const useUsers = new UseUsers(userRepository);
    spyCreateRepository.mockResolvedValue(null);
    const user = await useUsers.get(undefined, 'name22');

    expect(user).toBeInstanceOf(Error);
    expect(user).toStrictEqual(Error('Usuário não encontrado'));
  });
});
describe('Login UseUsers', () => {
  test('login', async () => {
    const findAllSpy = jest.spyOn(bcrypt, 'compare');

    findAllSpy.mockImplementation(async () => await Promise.resolve(true));
    const useUsers = new UseUsers(new MockUserRepository());

    const user = await useUsers.login('user', 'password');

    expect(typeof user).toBe('string');
  });
  test('login', async () => {
    const findAllSpy = jest.spyOn(bcrypt, 'compare');

    findAllSpy.mockImplementation(async () => await Promise.resolve(true));
    const useUsers = new UseUsers(new MockUserRepository());
    const spyUseUsers = jest.spyOn(useUsers, 'createToken');
    spyUseUsers.mockRejectedValue(new Error('error generico'));
    const user = await useUsers.login('user', 'password');
    expect(user).toBeInstanceOf(Error);
  });

  test('login and not found id', async () => {
    const findAllSpy = jest.spyOn(User, 'findAll');
    findAllSpy.mockResolvedValue([
      {
        name: 'user',
        password: 'password',
      } as unknown as User,
    ]);
    const useUsers = new UseUsers(new MockUserRepository());
    const user = await useUsers.login('user', 'password');
    expect(user).toBeInstanceOf(Error);
  });
  test('login and not found return error', async () => {
    const useUsers = new UseUsers(new MockUserRepository());
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
    const useUsers = new UseUsers(new MockUserRepository());

    const user = await useUsers.login('name', 'password');

    expect(user).toBeInstanceOf(Error);
    expect(user).toStrictEqual(Error('Usuário não encontrado'));
  });
  test('login and password invalid', async () => {
    const findAllSpy = jest.spyOn(bcrypt, 'compare');

    findAllSpy.mockImplementation(async () => await Promise.resolve(false));
    const useUsers = new UseUsers(new MockUserRepository());
    const user = await useUsers.login('user', 'password2223');

    expect(user).toBeInstanceOf(Error);
    expect(user).toStrictEqual(Error('Senha inválida'));
  });
  test('Reject create token', async () => {
    const findAllSpy = jest.spyOn(bcrypt, 'compare');

    findAllSpy.mockImplementation(async () => await Promise.resolve(false));
    const useUsers = new UseUsers(new MockUserRepository());
    try {
      await useUsers.createToken();
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
