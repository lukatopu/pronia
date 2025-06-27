export const convertPrice = (gelPrice, currency) => {
  const rates = {
    GEL: 1,
    USD: 0.37,
    EUR: 0.34,
  };

  const numeric = parseFloat(gelPrice.toString().replace(/[^\d.]/g, '')) || 0;
  return (numeric * rates[currency]).toFixed(2);
};
