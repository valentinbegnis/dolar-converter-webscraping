'use client'

import React, { useState } from 'react'
import DolarCard from '@/components/DolarCard'
import { DollarSign } from '@/components/Icons'

interface Props {
  dolars: DolarPrices
}

export default function HomeClient ({ dolars }: Props) {
  const [amount, setAmount] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numberRegEx = /^\d+$/
    const maxNumber = 1000000000000

    if (numberRegEx.test(value) && Number(value) < maxNumber) {
      setAmount(Number(value))
    }
  }

  return (
    <>
      <fieldset className='w-[320px] flex flex-col px-4 pt-6'>
        <label htmlFor='monto'>
          <span className='text-lg font-medium text-gray-100'>
            Monto en ARS
          </span>
        </label>
        <div tabIndex={0} className='flex items-center px-2 bg-white rounded-md focus:outline-blue-500'>
          <DollarSign />
          <input
            id='monto'
            type='number'
            min={1}
            max={1000000000000}
            placeholder='50000'
            onChange={e => handleChange(e)}
            className='w-full py-2 ml-2 rounded-md outline-none'
          />
        </div>
        <p className='pt-1 text-sm text-gray-300'>Número máximo de dígitos: 13</p>
      </fieldset>

      <section className='max-w-[900px] flex justify-center gap-6 px-4 py-6 rounded-xl'>
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
