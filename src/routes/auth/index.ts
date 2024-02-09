import express from 'express'

import { UseUsers } from '../../useCase/UseUsers'
import { UserRepository } from '../../infra/user-repository'

const router = express.Router()
require('dotenv').config()

router.post('', async (req: express.Request, res: express.Response) => {
  /**
   * @swagger
   * tags:
   *  - name: Auth
   *   description: Endpoints relacionados ao Auth
   */

  const userName = req.body.username
  const password = req.body.password

  if (!userName || !password) {
    res.status(400).send('Usuário ou senha não informados')
    return
  }

  try {
    const userRepository = new UserRepository()
    const useUsers = new UseUsers(userRepository)
    const newUser = await useUsers.create(userName, password)

    if (newUser instanceof Error) {
      return res.status(400).send(newUser.message)
    }
    return res.status(200).send({ message: newUser })
  } catch (err) {
    return res.status(400).send('Erro ao criar usuário')
  }
})

router.get('', async (req: express.Request, res: express.Response) => {
  /**
   * @swagger
   * tags:
   *   - name: Auth
   *     description: Endpoints relacionados ao Auth
   */

  const idUser = req.query.id?.toString() || undefined
  const nameUser = req.query.username?.toString() || undefined
  const userRepository = new UserRepository()
  const useUsers = new UseUsers(userRepository)
  const users = await useUsers.get(Number(idUser), nameUser)
  if (users instanceof Error) {
    return res.status(400).send(users.message)
  }
  return res.status(200).send(users)
})

router.put('', async (req: express.Request, res: express.Response) => {
  /**
   * @swagger
   * tags:
   *  - name: Auth
   *   description: Endpoints relacionados ao Auth
   */
  const userName = req.body.username
  const password = req.body.password
  try {
    const userRepository = new UserRepository()
    const useUsers = new UseUsers(userRepository)
    const loginSuccess = await useUsers.login(userName, password)
    if (loginSuccess instanceof Error) {
      return res.status(400).send(loginSuccess.message)
    }

    res.set('Authorization', loginSuccess)
    return res.status(200).send('Login realizado com sucesso')
  } catch (err) {
    return res.status(500).send('Erro ao Logar o usuário')
  }
})

module.exports = router
