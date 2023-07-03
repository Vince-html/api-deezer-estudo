import express from 'express';
import { GetTrack } from './useCase/getTracks';
import cors from 'cors';
const deezer = require('./routes/deezer/index.ts');
const search = require('./routes/search/index.ts');

import { JsonObject } from 'swagger-ui-express';
import bodyParser from 'body-parser';
// import { swagger } from './swagger/swagger_output.json';
import { serve, setup } from 'swagger-ui-express';

const deezerDoc = require('./swagger/swagger_output.json');

const app = express();

const jsonObject: JsonObject = deezerDoc as unknown as JsonObject;
app.use('/api-docs', serve, setup(jsonObject, { explorer: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/deezer', deezer);
app.use('/search', search);

function startServer() {
  const server = app.listen(3001, () => {});

  process.on('SIGINT', () => {
    server.close(() => {
      console.log('Servidor proxy encerrado.');
      process.exit(0);
    });
  });
}
if (require.main === module) {
  startServer();
}
// app.listen(3001, () => {});

export { app };
