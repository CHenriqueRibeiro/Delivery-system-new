export const useFormat = (num) => {
  let valueFormat = num.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
  return valueFormat;
};
