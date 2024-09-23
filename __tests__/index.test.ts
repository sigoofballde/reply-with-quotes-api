import { appendFile } from 'fs'
import httpMocks from 'node-mocks-http'

describe('Test for GET endpoints', () => {
  test('/', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/',
    })
  })
})

describe('Test for POST endpoints', () => {})
