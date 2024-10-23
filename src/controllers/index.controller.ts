import {
  GenerateContentCandidate,
  GoogleGenerativeAI,
} from '@google/generative-ai'
import { Request, Response } from 'express'
import { parseQuotes } from '../utils/dataManipulation'
import { Quote } from '../interfaces/general'
import { emptyDataSet } from '../utils/errors'

const API_KEY = process.env.GEMINI_API_KEY

export const home = (req: Request, res: Response) => {
  res.json({ response: 'API is up and running!' })
}

/**GOOGLE GEMINI TRY */
export const getConversation = async (req: Request, res: Response) => {
  const { conversation } = req.body
  const query = `give me the 3 best movie or tv show quotes to reply to "${conversation}", format the responses using the following format: "quote - reference (year)"`
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
