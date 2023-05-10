import { NextResponse } from 'next/server'
import { scrapeDolarPrices } from '@/dolar-scraper'
import { FetchError } from '@/custom-errors/fetchError'

export async function GET (req: Request) {
  try {
    const dolarPrices = await scrapeDolarPrices()
    return NextResponse.json(dolarPrices)
  } catch (err) {
    if (err instanceof FetchError) {
      return new Response(err.message, { status: err.statusCode })
    }
    return new Response('Internal Server Error', { status: 500 })
  }
}
