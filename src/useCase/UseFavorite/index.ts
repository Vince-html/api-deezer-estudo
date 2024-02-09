import { type ITrack, type IUseFavoriteMusic } from '../../interfaces'

// useFavorite
class UseFavorite implements IUseFavoriteMusic {
  // incrementeList
  async incrementeList (
    music: ITrack,
    userId: string
  ): Promise<ITrack[] | Error> {
    // T
    return []
  }
}
