import { formatCurrency } from '@/utils'

interface Props {
  dolar: [DolarPricesKey, Dolar]
  amount: number
}

const dolarCardColors = {
  'Dólar blue': 'from-blue-500 to-blue-300',
  'Dólar oficial': 'from-emerald-500 to-emerald-300',
  'Dólar bolsa': 'from-orange-500 to-orange-300',
  'Contado con liqui': 'from-purple-500 to-purple-300'
}

export default function DolarCard ({ dolar, amount }: Props) {
  const type = dolar[0]
  let buyPrice = dolar[1].buy
  let sellPrice = dolar[1].sell
  let buy, sell

  if (buyPrice.charAt(0) === '$') {
    buy = amount / Number(buyPrice.slice(1))
    sell = amount / Number(sellPrice.slice(1))
  } else {
    buyPrice = buyPrice.replace(',', '.')
    sellPrice = sellPrice.replace(',', '.')
    buy = amount / Number(buyPrice)
    sell = amount / Number(sellPrice)
  }

  return (
    <li
      key={type}
      className={`w-[320px] bg-gradient-to-l pt-2 rounded-md shadow-md ${dolarCardColors[type]}`}
    >
      <div className='p-3 bg-white rounded-md'>
        <h3 className='text-lg font-medium text-center text-emerald-900'>{type}</h3>
        <div className='flex justify-center gap-6'>
          <p className='text-3xl font-medium text-center'>
            <span className='text-sm tracking-wide text-gray-500 uppercase'>compra</span>
            <span className='block font-bold text-emerald-800'>{formatCurrency(buyPrice)}</span>
            <span className='text-xl text-gray-500 break-all'>{formatCurrency(buy)}</span>
          </p>
          <p className='text-3xl font-medium text-center'>
            <span className='text-sm tracking-wide text-gray-500 uppercase'>venta</span>
            <span className='block font-bold text-emerald-800'>{formatCurrency(sellPrice)}</span>
            <span className='text-xl text-gray-500 break-all'>{formatCurrency(sell)}</span>
          </p>
        </div>
        <p className='mt-4 text-sm text-center text-gray-500'>
          {dolar[1].updatedAt ?? `Actualizado el ${new Date().toLocaleDateString('es-AR')}`}
        </p>
      </div>
    </li>
  )
}
