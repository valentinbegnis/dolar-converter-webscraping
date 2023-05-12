import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Peso a Dólar',
  description: 'Conversor Peso a Dólar y cotizaciones minuto a minuto'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='h-full'>
      <body className={`${inter.className} bg-gradient-to-tr from-emerald-950 to-emerald-700 h-full`}>
        {children}
      </body>
    </html>
  )
}
