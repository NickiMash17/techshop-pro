// Currency utility for South African Rand (ZAR)
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Format currency without symbol (just the number)
export const formatCurrencyNumber = (amount) => {
  return new Intl.NumberFormat('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Get currency symbol
export const CURRENCY_SYMBOL = 'R';

// Convert USD to ZAR (approximate rate - you can update this)
export const USD_TO_ZAR_RATE = 18.5;

// Convert USD prices to ZAR
export const convertUSDToZAR = (usdPrice) => {
  return usdPrice * USD_TO_ZAR_RATE;
}; 