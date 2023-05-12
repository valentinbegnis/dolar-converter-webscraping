'use client'

interface Props {
  error: Error
  reset: () => void
}

export default function error ({ error, reset }: Props) {
  return (
    <div className='grid h-full px-4 text-center place-content-center'>
      <p className='text-emerald-200'>¡Ocurrió un error!</p>
      <h1 className='mt-4 text-3xl font-bold text-gray-100'>{error.message}</h1>
      <p className='mt-6 text-base leading-7 text-gray-200'>
        Por favor, intente nuevamente en unos minutos.
      </p>
      <div className='mt-10'>
        <button
          type='button'
          onClick={reset}
          className='hover:bg-emerald-300 hover:text-emerald-800 text-emerald-700 shadow-md bg-emerald-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
        >
          Intentar nuevamente
        </button>
      </div>
    </div>
  )
}
