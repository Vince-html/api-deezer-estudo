import { User } from '../Models/user';
import { type IUser } from '../interfaces';
import { type IUserRepository } from '../interfaces/user-repository';

class UserRepository implements IUserRepository {
  constructor() {}
  async create(user: IUser): Promise<void> {
    await User.create(user);
  }

  async update(user: IUser): Promise<void> {
    await User.update(user, { where: { id: user.id } });
  }

  async delete(id: number): Promise<void> {
    await User.destroy({ where: { id } });
  }

  async getById(id: number): Promise<IUser | null> {
    const user = await User.findByPk(id);

    return user?.dataValues || null;
  }

  async getByName(name: string): Promise<User | null> {
    const user = await User.findOne({
      where: { name },
      attributes: { exclude: ['password'] },
    });

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
    if (user == null) return false;
    return true;
  }
}

export { UserRepository };
