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
import { emptyDataSet } from './utils/errors'
import { routes } from './routes'

const app = express()
const port = process.env.PORT || 7069

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
)
app.use(bodyParser.json())
app.use('/', routes)

app.listen(port, () => {
  console.log(`Server running at http://localhost: ${port}`)
})
