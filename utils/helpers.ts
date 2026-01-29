
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const generateId = () => Math.random().toString(36).substr(2, 9).toUpperCase();

export const calculateTax = (amount: number, rate: number = 0.08) => amount * rate;
