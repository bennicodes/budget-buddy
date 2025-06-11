// Get data from server.js
const BASE_URL = "https://server-budgetbuddy.up.railway.app";

export const convertCurrency = async (from, to, amount) => {
  const url = `${BASE_URL}/api/convert?from=${from}&to=${to}&amount=${amount}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching currency conversion data:", error);
    return null;
  }
};

export const getCurrencySymbols = async () => {
  const url = `${BASE_URL}/api/symbols`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const result = data.currencies;
    return result;
  } catch (error) {
    console.error("Error fetching currency data:", error);
    return null;
  }
};
