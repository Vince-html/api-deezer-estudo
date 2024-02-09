import axios from 'axios';
import { mock } from '../../src/mock/track';
import { Search } from '../../src/useCase/search';

jest.mock('axios');

const dataResponse = {
  data: [mock],
  next: 'http://localhost:3001/search/?search=teste&index=1',
  prev: '',
  total: 1,
};

const dataPrev = {
  ...dataResponse,
  prev: 'http://localhost:3001/search/?search=teste&index=0',
};

test.each([[dataResponse], [dataPrev]])('search unit testing', async (data) => {
  axios.get = jest.fn().mockResolvedValue({ data });
  const searchApi = new Search();
  const result = await searchApi.search('teste', 1);
  expect(result).toEqual(data);
});
test('getTrack unit testing and error api', async () => {
  axios.get = jest
    .fn()
    .mockRejectedValue(new Error('Erro ao acessar a API do Deezer.'));
  const searchApi = new Search();
  const result = await searchApi.search('', 1);

  expect(result).toEqual(new Error('Falha na busca.'));
});
