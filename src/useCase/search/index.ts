import axios from 'axios';
import {
  type ISearch,
  type ISearchDeezer,
  type ITrack,
} from '../../interfaces';

export class Search implements ISearch {
  constructor() {}

  async search(arg: string, index?: number): Promise<ISearchDeezer | Error> {
    try {
      const response = await axios.get(
        `https://api.deezer.com/search?q=${arg}&index=${index}`
      );

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
            picture_big: track.artist.picture_big,
          },
          album: {
            id: track.album.id,
            title: track.album.title,
            cover: track.album.cover,
            cover_big: track.album.cover_big,
          },
        };
      });

      const next = response.data.next.match(/index=(\d+)/)[1];
      const prev = response.data.prev
        ? response.data.prev.match(/index=(\d+)/)[1]
        : '';
      const total = response.data.total;

      return {
        data: tracks,
        total,
        next: `http://localhost:3001/search/?search=${arg}&index=${next}`,
        prev: prev
          ? `http://localhost:3001/search/?search=${arg}&index=${prev}`
          : '',
      };
    } catch (error) {
      return new Error('Falha na busca.');
    }
  }
}
