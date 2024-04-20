export const formatCurrency = (amount: number) => {
  // Create a NumberFormat object with options for US dollars
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Format the amount as currency
  return formatter.format(amount);
};
