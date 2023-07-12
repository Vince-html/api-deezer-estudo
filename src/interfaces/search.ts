import { ITrack } from './track';

export interface ISearchDeezer {
  data: ITrack[];
  total: number;
  next: string;
  prev?: string;
}
