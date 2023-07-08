import { users } from '../../../db';
import { IUsers, User } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

class UseUsers implements IUsers {
  users: User[];
  constructor() {
    this.users = users;
  }
  private removePassword = (user: User) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  };

  async get(userId?: string, userName?: string) {
    if (userId) {
      const user = this.users.find((user) => user.id === userId);

      if (!user) {
        return new Error('Usuário não encontrado');
      }
      return this.removePassword(user);
    }
    if (userName) {
      const user = this.users.find((user) => user.name === userName);
      if (!user) {
        return new Error('Usuário não encontrado');
      }
      return this.removePassword(user);
    }
    const removeAllPasswords = this.users.map((user) => {
      return this.removePassword(user);
    });
    return removeAllPasswords;
  }
  async create(userName: string, password: string) {
    try {
      const findUser = this.users.find((user) => user.name === userName);

      if (findUser) {
        return new Error('Usuário já existe');
      }
      const hashPassword = await this.createPassword(password);
      const user = { name: userName, password: hashPassword, id: uuidv4() };
      this.users.push(user);
      return this.removePassword(user);
    } catch (err) {
      return new Error('Houve um problema na criação do usuário');
    }
  }
  async createPassword(password: string) {
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
    const findUser = this.users.find((user) => user.name === userName);
    if (!findUser) {
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
      const token = await this.createToken(findUser.id);
      if (token instanceof Error) {
        return token;
      }

      return token;
    } catch (err) {
      return new Error('Houve um problema na criação do usuário');
    }
  }
  async createToken(userId: string) {
    const tokenUser: string | Error = await new Promise((resolve, reject) => {
      require('dotenv').config();
      if (!process.env.TEST) {
        return new Error('Erro ao gerar token');
      }
      sign(userId, process.env.TEST, (err, token) => {
        if (err || !token) {
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
