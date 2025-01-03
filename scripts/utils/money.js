//Utilities related to money

// Function to format currency
export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2);
}