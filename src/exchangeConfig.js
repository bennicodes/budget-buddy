// Get data from server.js
export const convertCurrency = async (from, to, amount) => {
  const url = `http://localhost:3001/api/convert?from=${from}&to=${to}&amount=${amount}`;

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
  const url = `http://localhost:3001/api/symbols`;
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
