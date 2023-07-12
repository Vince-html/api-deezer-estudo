import express from 'express';

import cors from 'cors';
const search = require('./routes/search/index.ts');
const deezer = require('./routes/deezer/index.ts');

const authPost = require('./routes/auth/index.ts');

import { JsonObject } from 'swagger-ui-express';
import bodyParser from 'body-parser';
// import { swagger } from './swagger/swagger_output.json';
import { serve, setup } from 'swagger-ui-express';
import { sequelize } from './connect';

const deezerDoc = require('./swagger/swagger_output.json');

const app = express();
require('dotenv').config();
const jsonObject: JsonObject = deezerDoc as unknown as JsonObject;
app.use('/api-docs', serve, setup(jsonObject, { explorer: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/deezer', deezer);
app.use('/search', search);
app.use('/auth', authPost);

function startServer() {
  sequelize.sync().then(() => {
    console.log('All models were synchronized successfully.');
  });
  const server = app.listen(3001, () => {});

  process.on('SIGINT', () => {
    sequelize.close();
    server.close(() => {
      console.log('Servidor proxy encerrado.');
      process.exit(0);
    });
  });
}
if (require.main === module) {
  startServer();
}

export { app };
