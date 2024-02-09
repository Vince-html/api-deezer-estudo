import { Sequelize } from 'sequelize-typescript';
import { User } from '../Models/user';

const sequelize = new Sequelize({
  database: 'deezer',
  username: 'root',
  password: 'deezerapi123',
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
});

sequelize.addModels([User]);

export { sequelize };
