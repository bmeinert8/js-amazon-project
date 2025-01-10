//Utilities related to money

// Function to format currency
export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}