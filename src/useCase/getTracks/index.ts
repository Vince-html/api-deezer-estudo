import axios from 'axios'
import { type IGetTrack, type ITrack } from '../../interfaces'

export class GetTrack implements IGetTrack {
  constructor () {}

  async get (index: number, limit: number): Promise<ITrack[] | Error> {
    if (isNaN(index) || isNaN(limit)) {
      throw new Error('Erro ao acessar a API do Deezer.')
    }
    try {
      const response = await axios.get(
				`https://api.deezer.com/chart/0/tracks?index=${index}&limit=${limit}`
      )

      const tracks: ITrack[] = response.data.data.map((track: any) => {
        return {
          id: track.id,
          title: track.title,
          link: track.link,
          duration: track.duration,
          preview: track.preview,
          artist: {
            id: track.artist.id,
            name: track.artist.name,
            link: track.artist.link,
            picture: track.artist.picture,
            picture_big: track.artist.picture_big
          },
          album: {
            id: track.album.id,
            title: track.album.title,
            cover: track.album.cover,
            cover_big: track.album.cover_big
          }
        }
      })

      return tracks
    } catch (error) {
      return new Error('Erro ao acessar a API do Deezer.')
    }
  }
}
