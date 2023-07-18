import { IUser } from './user';

type UserP = Omit<IUser, 'password'>;

export interface IUsers {
  users: IUser[];
  get(userId?: number, userName?: string): Promise<UserP[] | UserP | Error>;
  create(userName: string, password: string): Promise<string | Error>;
  createPassword(password: string): Promise<string | Error>;
  comparePassword(password: string, hash: string): Promise<boolean | Error>;
  createToken(userId: number): Promise<string | Error>;
  login(userName: string, password: string): Promise<string | Error>;
}
