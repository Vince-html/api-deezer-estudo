import { type ITrack } from './track'
import { IUser } from './user'

interface IFavoriteMusic extends ITrack {
  userId: number
}

export type { IFavoriteMusic }
