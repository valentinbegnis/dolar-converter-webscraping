import HomeClient from './client'

export default async function Home () {
  const res = await fetch('http://localhost:3000/api/get-dolar-prices', { next: { revalidate: 60 } })
  const dolars: DolarPrices = await res.json()

  return (
    <main className='flex flex-col items-center justify-center min-h-screen gap-6'>
      <HomeClient dolars={dolars} />
    </main>
  )
}
