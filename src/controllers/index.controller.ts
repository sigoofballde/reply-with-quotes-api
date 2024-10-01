import {
  GenerateContentCandidate,
  GoogleGenerativeAI,
} from '@google/generative-ai'
import { Request, Response } from 'express'
import { parseQuotes } from '../utils/dataManipulation'
import { Quote } from '../interfaces/general'
import { emptyDataSet } from '../utils/errors'
import { inspect } from 'util'

// const API_KEY = process.env.ANTHROPIC_API_KEY
const API_KEY = process.env.GEMINI_API_KEY

export const home = (req: Request, res: Response) => {
  res.json({ response: 'API is up and running!' })
}

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
export const getConversation = async (req: Request, res: Response) => {
  const { conversation } = req.body
  const query = `give me the 3 best movie or tv show quotes to reply to "${conversation}", format the responses using the following format: "quote - reference"`
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

      const result: Quote[] = await parseQuotes(parsedResult)

      if (!result || result.length === 0) {
        throw emptyDataSet
      }
      res.status(200).json(result)
    } else {
      throw emptyDataSet
    }
  } catch (e: any) {
    console.log('Error response: ', e)
    res.status(500)
  }
}
