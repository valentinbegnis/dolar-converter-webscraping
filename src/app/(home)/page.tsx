import HomeClient from './client'

export default async function Home () {
  let dolars: DolarPrices = {}

  try {
    const res = await fetch('http://localhost:3000/api/get-dolar-prices', {
      next: { revalidate: 60 }
    })
    dolars = await res.json()
    console.log('1', dolars)
  } catch (err) {
    const backupRes = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales', {
      next: { revalidate: 60 }
    })
    const data: DolarFromAPI[] = await backupRes.json()

    const dolarsObject = data
      .filter(cotizacion =>
        ['Dolar Blue', 'Dolar Oficial', 'Dolar Bolsa', 'Dolar Contado con Liqui'].includes(cotizacion.casa.nombre)
      )
      .reduce((acc: DolarPricesFromAPI, cotizacion) => {
        let type = cotizacion.casa.nombre.toLowerCase()
        type = type.replace('o', 'ó')
        type = 'D' + type.slice(1)
        type = type === 'Dólar contado con liqui' ? 'Contado con liqui' : type

        acc[type] = {
          buy: cotizacion.casa.compra,
          sell: cotizacion.casa.venta
        }

        return acc
      }, {})

    const order = ['Dólar blue', 'Dólar oficial', 'Dólar bolsa', 'Contado con liqui']

    dolars = order.reduce((acc: DolarPricesFromAPI, type) => {
      if (type in dolarsObject) {
        acc[type] = dolarsObject[type]
      }
      return acc
    }, {})

    console.log('2', dolars)
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-screen gap-6'>
      <HomeClient dolars={dolars} />
    </main>
  )
}
