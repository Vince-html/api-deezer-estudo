import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';

import { IFavoriteMusic, IUser } from '../interfaces';

@Table
class FavoriteMusic extends Model<IFavoriteMusic> implements IFavoriteMusic {
  artist: {
    id: number;
    name: string;
    link: string;
    picture: string;
    picture_big: string;
  };
  album: { id: number; title: string; cover: string; cover_big: string };
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.INTEGER)
  userId: number;

  @Column(DataType.INTEGER)
  trackId: number;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  link: string;

  @Column(DataType.INTEGER)
  duration: number;

  @Column(DataType.STRING)
  preview: string;
}

export { FavoriteMusic };
