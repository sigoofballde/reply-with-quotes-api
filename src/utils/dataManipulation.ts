import { Quote } from '../interfaces/general'

export const parseQuotes = (quotes: string[]) => {
  const updatedQuotes: Quote[] = quotes.map((quote: string) => {
    const quoteParts: string[] = quote.split(' - ')
    const regexQuote: RegExpMatchArray | null =
      quoteParts[0].match(/"([^"]*?)"/g)
    const regexReference: RegExpMatchArray | null =
      quoteParts[1].match(/\*+([^\*]*?)\*/g)
    let actualQuote = ''
    let actualReference = ''
    if (regexQuote) {
      actualQuote = regexQuote[0]
    }

    if (regexReference) {
      actualReference = regexReference[0]
    }
    const returnQuote: Quote = {
      quote: actualQuote,
      reference: actualReference,
    }

    console.dir(regexQuote)

    // if (!returnQuote.reference) {
    // console.log(`Quote: ${quote}`)
    // }

    return returnQuote
  })

  return updatedQuotes
}
