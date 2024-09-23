import httpMocks from 'node-mocks-http'
import { home, getConversation } from '../src/controllers/index.controller'

describe('Test for GET endpoints', () => {
  test('/', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/',
    })

    const response = httpMocks.createResponse()

    const reply = home(request, response)
    console.log(reply)
  })
})

describe('Test for POST endpoints', () => {})
