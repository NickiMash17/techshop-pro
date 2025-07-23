// Currency utility for South African Rand (ZAR)
export const formatCurrency = (amount, fromUSD = true) => {
  // Convert USD to ZAR if the amount is in USD
  const zarAmount = fromUSD ? amount * USD_TO_ZAR_RATE : amount;
  
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(zarAmount);
};

// Format currency without symbol (just the number)
export const formatCurrencyNumber = (amount, fromUSD = true) => {
  const zarAmount = fromUSD ? amount * USD_TO_ZAR_RATE : amount;
  
  return new Intl.NumberFormat('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(zarAmount);
};

// Get currency symbol
export const CURRENCY_SYMBOL = 'R';

// Convert USD to ZAR (current rate as of 2025 - you can update this)
export const USD_TO_ZAR_RATE = 19.2;

// Convert USD prices to ZAR
export const convertUSDToZAR = (usdPrice) => {
  return usdPrice * USD_TO_ZAR_RATE;
}; 