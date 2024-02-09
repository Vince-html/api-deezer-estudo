import { type IUsers, type IUser } from '../../interfaces';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { User } from '../../Models/user';
import { type IUserRepository } from '../../interfaces/user-repository';
type UserP = Omit<IUser, 'password'>;
class UseUsers implements IUsers {
  private readonly userRepository: IUserRepository;
  constructor(UserRepository: IUserRepository) {
    this.userRepository = UserRepository;
  }

  users: IUser[];

  private readonly removePassword = (
    user: IUser
  ): {
    name: string;
    id?: number | undefined;
  } => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  };

  async get(
    userId?: number,
    userName?: string
  ): Promise<UserP | UserP[] | Error> {
    try {
      if (userId !== undefined && !isNaN(userId)) {
        const user = await this.userRepository.getById(userId);

        if (user == null) {
          return new Error('Usuário não encontrado');
        }
        return this.removePassword(user);
      }
      if (userName !== undefined && userName !== '') {
        const user = await this.userRepository.getByName(userName);

        if (user == null) {
          return new Error('Usuário não encontrado');
        }
        return this.removePassword(user);
      }
      const users = await this.userRepository.getAll();

      return users.map((user) => this.removePassword(user));
    } catch (err) {
      return new Error('Houve um problema na busca do usuário');
    }
  }

  async create(
    userName: string,
    password: string
  ): Promise<Error | 'Usuário criado com sucesso'> {
    try {
      const findUser = await this.userRepository.checkExistsUser(userName);

      if (findUser) {
        return new Error('Usuário já existe');
      }
      const hashPassword = await this.createPassword(password);
      await this.userRepository.create({
        name: userName,
        password: hashPassword,
      });

      return 'Usuário criado com sucesso';
    } catch (err) {
      return new Error('Houve um problema na criação do usuário');
    }
  }

  async createPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword;
  }

  async comparePassword(password: string, hash: string) {
    const isPasswordValid = await bcrypt.compare(password, hash);
    if (!isPasswordValid) {
      return new Error('Senha inválida');
    }
    return isPasswordValid;
  }

  async login(userName: string, password: string) {
    const users = await User.findAll();
    let token: string | Error;
    const findUser = users.find((user) => user.name === userName);
    if (findUser == null) {
      return new Error('Usuário não encontrado');
    }
    const enteredPassword = password;
    const storedHashedPassword = findUser.password;

    try {
      const isPasswordValid = await this.comparePassword(
        enteredPassword,
        storedHashedPassword
      );

      if (isPasswordValid instanceof Error) {
        return new Error('Senha inválida');
      }
      if (!findUser.id) {
        return new Error('Usuário não encontrado');
      }
      token = await this.createToken(findUser.id);
      if (token instanceof Error) {
        return token;
      }

      return token;
    } catch (err) {
      return new Error('Houve um problema na criação do usuário');
    }
  }

  async createToken(userId: number): Promise<string | Error> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('dotenv').config();
    const tokenUser: string | Error = await new Promise((resolve, reject) => {
      if (!process.env.TEST || process.env.TEST === 'undefined' || !userId) {
        reject(new Error('Erro ao gerar token'));
        return;
      }

      sign(userId.toString(), process.env.TEST, (err, token) => {
        if (err != null || !token) {
          reject(new Error('Erro ao gerar token'));
        } else {
          resolve(token);
        }
      });
    });
    return tokenUser;
  }
}

export { UseUsers };
