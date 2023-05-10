'use client'

import { useState } from 'react'
import DolarCard from '@/components/DolarCard'

interface Props {
  dolars: DolarPrices
}

export default function HomeClient ({ dolars }: Props) {
  const [amount, setAmount] = useState(0)

  return (
    <>
      <section className='flex flex-col px-4 pt-6'>
        <label htmlFor='monto'>
          <span className='text-lg font-medium text-gray-700'>
            Monto en ARS
          </span>
        </label>
        <input
          id='monto'
          type='number'
          min={1}
          placeholder='50000'
          onChange={e => setAmount(Number(e.target.value))}
          className='min-w-[320px] px-2 py-1 border-2 rounded-md border-stone-400'
        />
      </section>

      <section className='flex justify-center gap-6 px-4 pb-6 rounded-xl'>
        <ul className='flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row'>
          {Object.entries(dolars).map(([key, value]) => (
            <DolarCard
              key={key}
              dolar={[key as DolarPricesKey, value]}
              amount={amount}
            />
          ))}
        </ul>
      </section>
    </>
  )
}
