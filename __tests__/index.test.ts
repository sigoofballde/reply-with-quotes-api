import httpMocks from 'node-mocks-http'
import { home, getConversation } from '../src/controllers/index.controller'
import { formattedJSONResponse, geminiResponse } from '../testData/gemini'

jest.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: jest.fn(() => ({
      getGenerativeModel: jest.fn(() => ({
        generateContent: jest.fn(() => geminiResponse),
      })),
    })),
  }
})

describe('Test for GET endpoints', () => {
  test('/', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/',
    })

    const response = httpMocks.createResponse()

    home(request, response)
    const reply = await response._getJSONData()

    expect(reply.response).toEqual('API is up and running!')
  })
})

describe('Test for POST endpoints', () => {
  test('/getConversation', async () => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/getConversation',
      body: { conversation: 'Hello' },
    })

    const response = httpMocks.createResponse()

    await getConversation(request, response)
    expect(response._getJSONData()).toEqual(formattedJSONResponse)
  })
})
