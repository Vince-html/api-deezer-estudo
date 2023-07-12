import express from 'express';

const router = express.Router();

// favorite music in my list
router.post('', async (req: express.Request, res: express.Response) => {
  /**
   * @swagger
   * tags:
   *  - name: Favorite
   *   description: Endpoints relacionados ao Favorite
   */

  const music = req.body.music;
  const userId = req.body.userId;

  if (!music && !userId) {
    res.status(400).send('Nenhuma música foi enviada');
    return;
  }

  try {
    // const useFavorite = new UseFavorite();
    // const newFavorite = await useFavorite.create(music, id);

    // if (newFavorite instanceof Error) {
    //   return res.status(400).send(newFavorite.message);
    // }
    return res.status(200).send({ message: 'music created successfully' });
  } catch (err) {
    return res.status(400).send('Error creating music');
  }
});
