export const priceFormatter = (price) => {
  if (price)
    return `${price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })}`;
  else return '';
};

export const dateFormatter = (date) => {
  const dateObj = new Date(date);
  return !date
    ? date
    : `${('0' + dateObj.getUTCDate()).slice(-2)}/${(
        '0' +
        (dateObj.getUTCMonth() + 1)
      ).slice(-2)}/${dateObj.getUTCFullYear()}`;
};

export const dateTimeFormatter = (date) => {
  const dateObj = new Date(date);
  return !date
    ? date
    : `${('0' + dateObj.getUTCDate()).slice(-2)}/${(
        '0' +
        (dateObj.getUTCMonth() + 1)
      ).slice(-2)}/${dateObj.getUTCFullYear()} ${(
        '0' + dateObj.getHours()
      ).slice(-2)}:${('0' + dateObj.getMinutes()).slice(-2)}`;
};

export const dateFormFieldFormatter = (date) => {
  const dateObj = new Date(date);
  return !date
    ? date
    : `${dateObj.getUTCFullYear()}-${('0' + (dateObj.getUTCMonth() + 1)).slice(
        -2
      )}-${('0' + dateObj.getUTCDate()).slice(-2)}`;
};

export const ufList = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MS',
  'MT',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];
