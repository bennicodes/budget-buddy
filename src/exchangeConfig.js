const exchangeApiKey = import.meta.env.VITE_CURRENCY_API_KEY;

export const convertCurrency = async (from, to, amount) => {
  const url = `https://api.exchangerate.host/convert?access_key=${exchangeApiKey}&from=${from}&to=${to}&amount=${amount}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching currency conversion data:", error);
    return null;
  }
};
