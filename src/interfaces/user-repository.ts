import { type IUser } from './user';

export interface IUserRepository {
  create: (user: IUser) => Promise<void>;
  update: (user: IUser) => Promise<void>;
  delete: (id: number) => Promise<void>;
  getById: (id: number) => Promise<IUser | null>;
  getByName: (name: string) => Promise<IUser | null>;
  getAll: () => Promise<IUser[]>;
  checkExistsUser: (name: string) => Promise<boolean>;
}
