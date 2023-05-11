export const formatCurrency = (price: string | number) => {
  let parsedPrice = price

  if (typeof price === 'string') {
    parsedPrice = price.charAt(0) === '$'
      ? Number(price.slice(1))
      : Number(price)
  }

  return parsedPrice.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  })
}

export const formatDolarFromAPIResponse = (data: DolarFromAPI[]) => {
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

  const dolars = order.reduce((acc: DolarPricesFromAPI, type) => {
    if (type in dolarsObject) {
      acc[type] = dolarsObject[type]
    }
    return acc
  }, {})

  return dolars as DolarPrices
}
