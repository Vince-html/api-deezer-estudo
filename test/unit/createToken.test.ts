import { UseUsers } from '../../src/useCase/UseUsers';

process.env.TEST = 'validSecret';

const handleCallCreateToken = async (useUsers: UseUsers): Promise<unknown> => {
  try {
    await useUsers.createToken(1);
  } catch (err) {
    return err;
  }
};
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
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn((userId, secret, callback) => {
    if (secret === 'validSecret') {
      callback(null, 'tokenGerado');
    } else {
      callback(Error('Erro na geração do token'));
    }
  }),
}));
describe('createToken', () => {
  it('deve retornar um erro quando process.env.TEST não está definido', async () => {
    const useUsers = new UseUsers(userRepository);

    const result = await useUsers.createToken(1);
    expect(result).toBe('tokenGerado');
  });

  it('deve retornar um erro quando ocorre um erro durante a geração do token', async () => {
    delete process.env.TEST;

    const useUsers = new UseUsers(userRepository);
    const err = await handleCallCreateToken(useUsers);
    expect(err).toStrictEqual(Error('Erro ao gerar token'));
  });
  it('deve retornar um erro quando ocorre um erro durante a geração do token undefined', async () => {
    process.env.TEST = undefined;

    const useUsers = new UseUsers(userRepository);
    const err = await handleCallCreateToken(useUsers);
    expect(err).toStrictEqual(Error('Erro ao gerar token'));
  });
});
