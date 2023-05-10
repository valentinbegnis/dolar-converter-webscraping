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
