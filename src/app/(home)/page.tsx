import { formatDolarFromAPIResponse } from '@/utils'
import HomeClient from './client'
import { FetchError } from '@/custom-errors/fetchError'

export default async function Home () {
  let dolars: DolarPrices = {}

  try {
    const res = await fetch('https://dolar-converter.netlify.app/api/get-dolar-prices', { cache: 'no-store' })
    dolars = await res.json()
  } catch (err) {
    console.log(err)
    try {
      const backupRes = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales', { cache: 'no-store' })
      const data: DolarFromAPI[] = await backupRes.json()
      dolars = formatDolarFromAPIResponse(data)
    } catch (err) {
      throw new FetchError('Nuestros servicios no están disponibles en este momento.')
    }
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-screen'>
      <HomeClient dolars={dolars} />
    </main>
  )
}
