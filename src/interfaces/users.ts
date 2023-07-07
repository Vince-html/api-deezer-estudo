import { User } from './user';

type UserP = Omit<User, 'password'>;

export interface IUsers {
  users: User[];
  get(userId?: string, userName?: string): Promise<UserP[] | UserP | Error>;
  create(userName: string, password: string): Promise<UserP | Error>;
  createPassword(password: string): Promise<string | Error>;
  comparePassword(password: string, hash: string): Promise<boolean | Error>;
  createToken(userId: string): Promise<string | Error>;
  login(userName: string, password: string): Promise<string | Error>;
}
