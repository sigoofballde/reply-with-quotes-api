import axios, { AxiosError } from 'axios'
import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Request, Response } from 'express'

import {
  GenerateContentCandidate,
  GoogleGenerativeAI,
} from '@google/generative-ai'
import { Quote } from './interfaces/general'
import { parseQuotes } from './utils/dataManipulation'

const app = express()
const port = process.env.PORT || 7069
// const API_KEY = process.env.ANTHROPIC_API_KEY
const API_KEY = process.env.GEMINI_API_KEY

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
)
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.send('API is up and running!')
})

/**OPENAI CHATGPT TRY */
// app.post('/getConversation', async (req: Request, res: Response) => {
//     const { body } = req
// const client = new OpenAI({
//     organization: process.env.OPENAI_ORGANIZATION_ID,
//     project: process.env.OPENAI_PROJECT_ID,
//     apiKey: process.env.OPENAI_SECRET_KEY,
// })
//     try {
//         // const completion = await client.chat.completions.create({
//         //     model: 'gpt-4o-mini',
//         //     messages: [{ 'role': 'user', 'content': `give me the 3 best movie or tv show quotes to reply to "${body}"` }]
//         // })
//         res.status(200).json(completion)
//     } catch (e) {
//         res.sendStatus(500)
//     }
// })

/**ANTHROPIC CLAUDE 3 TRY */
// app.post('/getConversation', async (req: Request, res: Response) => {
//   const { conversation } = req.body
//   const prompt = `give me the 3 best movie or tv show quotes to reply to "${conversation}"`
// interface ClaudeResponse {
//   completion: string
// }

// const anthropic = new Anthropic({
//   apiKey: API_KEY,
// })
//   try {
//     const completion = await anthropic.messages.create({
//       model: 'claude-3-5-sonnet-20240620',
//       max_tokens: 1024,
//       messages: [
//         {
//           role: 'user',
//           content: prompt,
//         },
//       ],
//     })
//     res.status(200).json(completion)
//   } catch (e: any) {
//     res.sendStatus(500)
//   }
// })

/**GOOGLE GEMINI TRY */
app.post('/getConversation', async (req: Request, res: Response) => {
  const { conversation } = req.body
  const query = `give me the 3 best movie or tv show quotes to reply to "${conversation}"`
  const gemini = new GoogleGenerativeAI(API_KEY || '')
  const geminiModel = gemini.getGenerativeModel({ model: 'gemini-1.5-flash' })

  try {
    const candidates: GenerateContentCandidate[] | undefined = await (
      await geminiModel.generateContent(query)
    ).response.candidates

    if (candidates) {
      const parsedResult: string[] = candidates[0].content.parts[0].text
        ?.split('\n')
        .filter(
          (element: string) =>
            element.includes('**') && !element.includes('**Context:**')
        )!

      const result: Quote[] = parseQuotes(parsedResult)
      res.status(200).json(parsedResult)
    } else {
      throw new Error('Gemini returned empty array!')
    }
  } catch (e: any) {
    console.log('Error response: ', e)
    res.status(500)
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost: ${port}`)
})
