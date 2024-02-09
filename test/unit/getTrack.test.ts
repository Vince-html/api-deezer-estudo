import axios from 'axios'
import { GetTrack } from '../../src/useCase/getTracks'
import { mock } from '../../src/mock/track'

jest.mock('axios')

test('getTrack unit testing', async () => {
  axios.get = jest.fn().mockResolvedValue({
    data: {
      data: [mock]
    }
  })
  const getTrack = new GetTrack()
  const tracks = await getTrack.get(0, 13)

  expect(tracks).toEqual([mock])
})
test('getTrack unit testing and error api', async () => {
  axios.get = jest
    .fn()
    .mockRejectedValue(new Error('Erro ao acessar a API do Deezer.'))
  const getTrack = new GetTrack()
  const tracks = await getTrack.get(0, 13)

  expect(tracks).toEqual(new Error('Erro ao acessar a API do Deezer.'))
})
