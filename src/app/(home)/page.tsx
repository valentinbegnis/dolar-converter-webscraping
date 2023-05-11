import { formatDolarFromAPIResponse } from '@/utils'
import HomeClient from './client'

export default async function Home () {
  let dolars: DolarPrices = {}

  try {
    const res = await fetch('http://localhost:3000/api/get-dolar-prices', {
      next: { revalidate: 60 }
    })
    dolars = await res.json()
  } catch (err) {
    const backupRes = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales', {
      next: { revalidate: 60 }
    })
    const data: DolarFromAPI[] = await backupRes.json()
    dolars = formatDolarFromAPIResponse(data)
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-screen gap-6'>
      <HomeClient dolars={dolars} />
    </main>
  )
}
