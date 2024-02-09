import { type ITrack } from './track'

interface IUseFavoriteMusic {
  incrementeList: (music: ITrack, userId: string) => Promise<ITrack[] | Error>
}

export type { IUseFavoriteMusic }
