export const calculateSubtotal = (items) => {
  if (!items || items.length === 0) return 0;
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};