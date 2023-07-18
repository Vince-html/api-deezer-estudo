import { User } from '../Models/user';
import { IUser } from '../interfaces';
import { IUserRepository } from '../interfaces/user-repository';

class UserRepository implements IUserRepository {
  constructor() {}
  async create(user: User): Promise<void> {
    await User.create(user);
  }
  async update(user: User): Promise<void> {
    await User.update(user, { where: { id: user.id } });
  }
  async delete(id: number): Promise<void> {
    await User.destroy({ where: { id } });
  }
  async getById(id: number): Promise<User | null> {
    const user = await User.findByPk(id);

    return user;
  }
  async getByName(name: string): Promise<User | null> {
    const user = await User.findOne({ where: { name } });

    return user;
  }
  async getAll(): Promise<IUser[]> {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    const allUsers = users.map((user) => {
      return user.dataValues;
    });
    return allUsers;
  }
  async checkExistsUser(name: string): Promise<boolean> {
    const user = await User.findOne({ where: { name } });
    if (!user) return false;
    return true;
  }
}

export { UserRepository };
