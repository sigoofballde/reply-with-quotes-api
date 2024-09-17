import { Quote } from '../interfaces/general'

export const parseQuotes = (quotes: string[]) => {
  const updatedQuotes: Quote[] = quotes.map((quote: string) => {
    const quoteParts: string[] = quote.split(' - ')
    const regexQuote: RegExpMatchArray | null = quoteParts[0].match(/"(.*?)"/g)
    let actualQuote = ''
    if (regexQuote) {
      actualQuote = regexQuote[0]
    }

    const returnQuote: Quote = {
      quote: actualQuote,
      reference: quoteParts[1],
    }

    return returnQuote
  })

  return updatedQuotes
}
