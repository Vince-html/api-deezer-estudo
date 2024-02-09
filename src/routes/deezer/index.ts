import express from 'express'
import { GetTrack } from '../../useCase/getTracks'

const router = express.Router()

router.get('', async (req: express.Request, res: express.Response) => {
  /**
   * @swagger
   * tags:
   *   - name: Deezer
   *     description: Endpoints relacionados ao Deezer
   */
  try {
    const index = req.query.index ? Number(req.query.index) : 0
    const limit = req.query.limit ? Number(req.query.limit) : 13

    const getTrack = new GetTrack()
    const tracks = await getTrack.get(index, limit)

    const responseData = {
      data: tracks,
      total: Array.isArray(tracks) ? tracks.length : 0
    }

    res.status(200).json(responseData)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao acessar a API do Deezer.' })
  }
})

module.exports = router
