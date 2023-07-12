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

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.addModels([User]);

sequelize
  .sync()
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch((err: any) => {
    console.log(err);
  });

export { sequelize };
