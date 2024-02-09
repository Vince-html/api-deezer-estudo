import request from 'supertest'
import { mock } from '../../src/mock/track'
import { app } from '../../src/server'
import { sequelize } from '../../src/connect'
afterAll(async () => {
  await sequelize.close()

  // await stopContainer();
})
beforeEach(async () => {
  await sequelize.sync()
})

let MockGetTrack: jest.Mock
beforeEach(() => {
  MockGetTrack = jest.fn().mockResolvedValue([mock])
})

jest.mock('../../src/useCase/getTracks', () => ({
  GetTrack: jest.fn().mockImplementation(() => ({
    get: MockGetTrack
  }))
}))
test('should return api', async () => {
  const response = await request(app)
    .get('/deezer')
    .query({ index: 1, limit: 1 })
  expect(response.status).toBe(200)
  const dataResponse = {
    data: [mock],
    total: [mock].length
  }
  expect(response.body).toEqual(dataResponse)
  expect(MockGetTrack).toHaveBeenCalledWith(1, 1)
})
test('should return error', async () => {
  MockGetTrack = jest
    .fn()
    .mockRejectedValue(new Error('Erro ao acessar a API do Deezer.'))
  const response = await request(app).get('/deezer')
  expect(MockGetTrack).toHaveBeenCalledWith(0, 13)
  expect(response.status).toBe(500)
})
