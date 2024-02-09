import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';

import { type IUser } from '../interfaces';

@Table
class User extends Model<IUser> implements IUser {
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  password: string;

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;
}

export { User };
