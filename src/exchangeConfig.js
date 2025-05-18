const apiKey = import.meta.env.VITE_CURRENCY_API_KEY;

export const convertCurrency = async (from, to, amount) => {
  const url = `https://api.exchangerate.host/convert?access_key=${apiKey}&from=${from}&to=${to}&amount=${amount}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching currency conversion data:", error);
    return null;
  }
};

export const getCurrencySymbols = async (from, to, amount) => {
  const url = `https://api.exchangerate.host/list?access_key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const result = data.currencies;
    console.log(result);

    return result;
  } catch (error) {
    console.error("Error fetching currency data:", error);
    return null;
  }
};
