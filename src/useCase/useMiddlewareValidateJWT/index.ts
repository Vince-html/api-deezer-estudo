import { type NextFunction, type Request, type Response } from 'express-serve-static-core'
import * as jwt from 'jsonwebtoken'

require('dotenv').config()

const middlewareValidarJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['x-access-token']

  if (!process.env.TEST || !token || typeof token !== 'string') {
    res.status(400).send('Erro ao gerar token')
  } else {
    jwt.verify(token, process.env.TEST, (err, userInfo) => {
      if (err != null) {
        res.status(403).end()
        return
      }
      req.body.userId = userInfo
      next()
    })
  }
}

export { middlewareValidarJWT }
