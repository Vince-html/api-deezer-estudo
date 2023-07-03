import express from 'express';
import { GetTrack } from '../../useCase/getTracks';
import { Search } from '../../useCase/search';

const router = express.Router();

router.get('', async (req: express.Request, res: express.Response) => {
  /**
   * @swagger
   * tags:
   *   - name: Search
   *     description: Endpoints de busca
   */
  try {
    const keySearch = req.query.search?.toString();
    const index = req.query.index ? Number(req.query.index) : 0;

    if (keySearch?.length === 0 || !keySearch) {
      res.status(400).json({ error: 'O campo search é obrigatório.' });
    } else {
      const searchTrack = new Search();
      const tracks = await searchTrack.search(keySearch, index);
      console.log(tracks);

      const responseData = {
        ...tracks,
      };

      res.status(200).json(responseData);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao acessar a API do Deezer.' });
  }
});

module.exports = router;
