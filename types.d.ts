type DolarPricesKey = 'Dólar blue' | 'Dólar oficial' | 'Dólar bolsa' | 'Contado con liqui'

interface Dolar {
  buy: string
  sell: string
  updatedAt: string
}

type DolarPrices = {
  [key in DolarPricesKey]?: Dolar
}
