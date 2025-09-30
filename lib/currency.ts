// Currency formatting utility for Philippine Peso
// All prices in the database are stored in PHP

export function formatPrice(priceInPHP: number): string {
  return `₱${priceInPHP.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function formatCurrency(amount: number): string {
  return formatPrice(amount)
}

// For display without decimals (cleaner look)
export function formatPriceShort(priceInPHP: number): string {
  return `₱${Math.round(priceInPHP).toLocaleString("en-PH")}`
}
