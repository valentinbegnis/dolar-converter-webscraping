import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Peso a Dólar',
  description: 'Conversor Peso a Dólar y últimas cotizaciones'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es' className='h-full'>
      <body className={`${inter.className} h-full bg-fixed bg-no-repeat bg-gradient-to-tr from-emerald-950 to-emerald-700`}>
        {children}
      </body>
    </html>
  )
}
