// Currency conversion utility
const USD_TO_PHP = 56.5 // Current exchange rate (approximate)

export function formatPrice(priceInUSD: number): string {
  const priceInPHP = priceInUSD * USD_TO_PHP
  return `₱${priceInPHP.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function convertToPhp(priceInUSD: number): number {
  return priceInUSD * USD_TO_PHP
}
