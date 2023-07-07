import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import bcrypt from 'bcrypt';

import * as jwt from 'jsonwebtoken';
import { users } from '../../../db';
import { UseUsers } from '../../useCase/UseUsers';

const router = express.Router();
require('dotenv').config();

router.post('', async (req: express.Request, res: express.Response) => {
  /**
   * @swagger
   * tags:
   *  - name: Auth
   *   description: Endpoints relacionados ao Auth
   */

  const userName = req.body.username;
  const password = req.body.password;

  if (!userName || !password) {
    res.status(400).send('Usuário ou senha não informados');
    return;
  }

  try {
    const useUsers = new UseUsers();
    const newUser = await useUsers.create(userName, password);

    if (newUser instanceof Error) {
      return res.status(400).send(newUser.message);
    }
    return res
      .status(200)
      .send({ message: 'Usuário criado com sucesso', data: newUser });
  } catch (err) {
    return res.status(400).send('Erro ao criar usuário');
  }
});

router.get('', async (req: express.Request, res: express.Response) => {
  /**
   * @swagger
   * tags:
   *   - name: Auth
   *     description: Endpoints relacionados ao Auth
   */

  const idUser = req.query.id?.toString() || undefined;
  const nameUser = req.query.username?.toString() || undefined;

  const useUsers = new UseUsers();
  const users = await useUsers.get(idUser, nameUser);
  if (users instanceof Error) {
    return res.status(400).send(users.message);
  }
  return res.status(200).send(users);
});

router.put('', async (req: express.Request, res: express.Response) => {
  /**
   * @swagger
   * tags:
   *  - name: Auth
   *   description: Endpoints relacionados ao Auth
   */
  const userName = req.body.username;
  const password = req.body.password;
  try {
    const useUsers = new UseUsers();
    const loginSuccess = await useUsers.login(userName, password);
    if (loginSuccess instanceof Error) {
      return res.status(400).send(loginSuccess.message);
    }

    res.set('Authorization', loginSuccess);
    return res.status(200).send('Login realizado com sucesso');
  } catch (err) {
    return res.status(400).send('Erro ao criar usuário');
  }
});

module.exports = router;
