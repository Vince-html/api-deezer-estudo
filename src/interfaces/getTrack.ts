import { type ITrack } from './track'

export interface IGetTrack {
  get: (index: number, limit: number) => Promise<ITrack[] | Error>
}
