export const formatINR = (amount) => {
  const numAmount = Number(amount)
  if (isNaN(numAmount) || numAmount <= 0) {
    return '₹0'
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numAmount)
}

export const formatINRWithDecimals = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount || 0)
}

