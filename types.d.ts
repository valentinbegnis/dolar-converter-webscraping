type DolarPricesKey = 'Dólar blue' | 'Dólar oficial' | 'Dólar bolsa' | 'Contado con liqui'

interface Dolar {
  buy: string
  sell: string
  updatedAt?: string
}

type DolarPrices = {
  [key in DolarPricesKey]?: Dolar
}

interface DolarFromAPI {
  casa: {
    compra: string
    venta: string
    agencia: string
    nombre: string
    variacion?: string
    ventaCero?: string
    decimales: string
  }
}

interface DolarPricesFromAPI {
  [key: string]: {
    buy: string
    sell: string
  }
}
