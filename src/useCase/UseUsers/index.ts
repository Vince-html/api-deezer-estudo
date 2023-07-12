import { users } from '../../../db';
import { IUsers, IUser } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { User } from '../../Models/user';
import { sequelize } from '../../connect';

class UseUsers implements IUsers {
  constructor() {}
  users: IUser[];

  private removePassword = (user: IUser) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  };

  async get(userId?: number, userName?: string) {
    const users = await User.findAll({
      attributes: ['id', 'name'],
      raw: true,
    });

    if (userId) {
      const user = users.find((user) => user.id === userId);

      if (!user) {
        return new Error('Usuário não encontrado');
      }
      return this.removePassword(user);
    }
    if (userName) {
      const user = users.find((user) => user.name === userName);
      if (!user) {
        return new Error('Usuário não encontrado');
      }
      return this.removePassword(user);
    }

    return users;
  }
  async create(userName: string, password: string) {
    const users = await User.findAll({
      attributes: ['name'],
      raw: true,
    });

    try {
      const findUser = users.find((user) => user.name === userName);

      if (findUser) {
        return new Error('Usuário já existe');
      }
      const hashPassword = await this.createPassword(password);
      const newU = await User.create({
        name: userName,
        password: hashPassword,
      });
      const userNew = {
        name: newU.name,
        id: newU.id,
      };

      return userNew;
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
    const users = await User.findAll();
    let token: string | Error;
    const findUser = users.find((user) => user.name === userName);
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
  async createToken(userId: number) {
    require('dotenv').config();
    const tokenUser: string | Error = await new Promise((resolve, reject) => {
      if (!process.env.TEST || process.env.TEST === 'undefined' || !userId) {
        return reject(new Error('Erro ao gerar token'));
      }

      sign(userId.toString(), process.env.TEST, (err, token) => {
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
