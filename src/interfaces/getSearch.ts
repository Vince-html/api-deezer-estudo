import { ISearchDeezer } from './search';

export interface ISearch {
  search(arg: string, index?: number): Promise<ISearchDeezer | Error>;
}
