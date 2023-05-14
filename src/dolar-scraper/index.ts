import { JSDOM } from 'jsdom'
import { FetchError } from '@/custom-errors/fetchError'

interface DolarOfInterest {
  type: DolarPricesKey
  url: string
}

const dolars: DolarOfInterest[] = [
  {
    type: 'Dólar blue',
    url: 'https://dolarhoy.com/cotizaciondolarblue'
  },
  {
    type: 'Dólar oficial',
    url: 'https://dolarhoy.com/cotizaciondolaroficial'
  },
  {
    type: 'Dólar bolsa',
    url: 'https://dolarhoy.com/cotizaciondolarbolsa'
  },
  {
    type: 'Contado con liqui',
    url: 'https://dolarhoy.com/cotizaciondolarcontadoconliqui'
  }
]

export const scrapeDolarPrices = async () => {
  const results: DolarPrices = {}

  for (const dolar of dolars) {
    const { type, url } = dolar

    const res = await fetch(url, { cache: 'no-cache' })

    if (!res.ok) {
      throw new FetchError(`Error fetching resource. Status code: ${res.status}`, res.status)
    }

    const page = await res.text()

    const dom = new JSDOM(page)
    const document = dom.window.document

    const values: HTMLDivElement[] = Array.from(document.querySelectorAll('.value'))
    const spans: HTMLSpanElement[] = Array.from(document.getElementsByTagName('span'))

    const buy = values[0]?.textContent
    const sell = values[1]?.textContent
    const updatedAt = spans.find(span => span.innerHTML.includes('Actualizado'))?.innerHTML

    if (buy !== null && sell !== null && typeof updatedAt !== 'undefined') {
      const result = { buy, sell, updatedAt }
      results[type] = result
    }
  }

  return results
}
