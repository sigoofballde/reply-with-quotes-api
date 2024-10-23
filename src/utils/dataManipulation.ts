import { Quote } from '../interfaces/general'

export const removeQuotesAsterisks = (quotes: Quote[]) => {
  const updatedQuotes: Quote[] = quotes.map((quoteReference: Quote) => {
    const updatedQuote: string = quoteReference.quote
      .replace(/\"/g, '')
      .replace(/\* /g, '')
      .replace(/\*/g, '')

    const updatedReference: string = quoteReference.reference
      .replace(/\"/g, '')
      .replace(/\* /g, '')
      .replace(/\*/g, '')

    return {
      quote: updatedQuote,
      reference: updatedReference,
    }
  })

  return updatedQuotes
}

export const parseQuotes = (quotes: string[]) => {
  const splitQuotes: Quote[] = quotes.map((quote: string) => {
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

  const updatedQuotes: Quote[] = removeQuotesAsterisks(splitQuotes)

  return updatedQuotes
}
