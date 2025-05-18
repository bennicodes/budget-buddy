import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { convertCurrency, getCurrencySymbols } from "../../exchangeConfig";
import Button from "../Button/Button";
import styles from "./CurrencyCalculator.module.css";

const CurrencyCalculator = () => {
  const [currencyData, setCurrencyData] = useState({
    fromCurrency: "USD",
    toCurrency: "NOK",
    fromAmount: 1,
    result: null,
  });
  const [currencySymbols, setCurrencySymbols] = useState({});
  const topFromCurrencyCodes = ["USD", "EUR", "GBP", "NOK"];
  const topToCurrencyCodes = ["NOK", "USD", "EUR", "GBP"];

  //   Track input from user
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrencyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //   Switch currencies
  const handleSwitch = () => {
    setCurrencyData((prevData) => ({
      ...prevData,
      fromCurrency: prevData.toCurrency,
      toCurrency: prevData.fromCurrency,
    }));
  };

  //   Get currency symbols from API and store in local storage to limit fetches and preserve data when switching pages
  useEffect(() => {
    const fetchCurrencySymbols = async () => {
      try {
        const storedSymbols = localStorage.getItem("currencySymbols");
        if (storedSymbols) {
          setCurrencySymbols(JSON.parse(storedSymbols));
        } else {
          const result = await getCurrencySymbols();
          setCurrencySymbols(result);
          localStorage.setItem("currencySymbols", JSON.stringify(result));
        }
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };
    fetchCurrencySymbols();
  }, []);

  // Trigger conversion when symbols are fetched (when the component mounts)
  useEffect(() => {
    if (
      currencySymbols &&
      Object.keys(currencySymbols).length > 0 &&
      currencyData.result === null
    ) {
      const convertInitial = async () => {
        const data = await convertCurrency(
          currencyData.fromCurrency,
          currencyData.toCurrency,
          currencyData.fromAmount
        );
        setCurrencyData((prevData) => ({
          ...prevData,
          result: data.result,
        }));
      };
      convertInitial();
    }
  }, [currencySymbols]);

  //   //   Convert currencies when inputs change
  //   useEffect(() => {
  //     const convert = async () => {
  //       const data = await convertCurrency(
  //         currencyData.fromCurrency,
  //         currencyData.toCurrency,
  //         currencyData.fromAmount
  //       );
  //       console.log(data);
  //       setCurrencyData((prevData) => ({
  //         ...prevData,
  //         result: data.result,
  //       }));
  //     };

  //     if (currencyData.fromAmount > 0) {
  //       convert();
  //     }
  //   }, [
  //     currencyData.fromCurrency,
  //     currencyData.toCurrency,
  //     currencyData.fromAmount,
  //   ]);

  return (
    <div className={styles.calculatorWrapper}>
      <h2 className={styles.calculatorTitle}>Currency Calculator</h2>

      <form className={styles.calculatorForm}>
        <div className={styles.currencyInputGroup}>
          <label htmlFor="fromCurrency">From:</label>
          <div className={styles.amountContainer}>
            <input
              type="number"
              name="fromAmount"
              id="fromAmount"
              className={styles.amountInput}
              value={currencyData.fromAmount}
              onChange={handleChange}
              min={0}
            />
            <span className={styles.currencySymbol}>
              {currencyData.fromCurrency}
            </span>
          </div>
          <select
            name="fromCurrency"
            id="fromCurrency"
            className={styles.currencyDropdown}
            value={currencyData.fromCurrency}
            onChange={handleChange}
          >
            {currencySymbols && (
              <>
                {/* Render top currencies first */}
                {topFromCurrencyCodes
                  .filter((code) => currencySymbols[code])
                  .map((code) => (
                    <option key={code} value={code}>
                      {currencySymbols[code]} - {code}
                    </option>
                  ))}

                {/* Render the rest alphabetically, excluding the top ones */}
                {Object.entries(currencySymbols)
                  .filter(([code]) => !topFromCurrencyCodes.includes(code))
                  .sort((a, b) => a[0].localeCompare(b[0]))
                  .map(([code, name]) => (
                    <option key={code} value={code}>
                      {name} - {code}
                    </option>
                  ))}
              </>
            )}
          </select>
        </div>
        <div className={styles.switchContainer}>
          <Button
            className={styles.switchButton}
            type="button"
            onClick={handleSwitch}
          >
            <FontAwesomeIcon icon={faRepeat} />
          </Button>
        </div>
        {/* ------------------------- */}
        <div className={styles.currencyInputGroup}>
          <label htmlFor="toCurrency">To:</label>
          <div className={styles.amountContainer}>
            <span className={styles.amountDisplay}>
              {currencyData.result?.toFixed(2)}
            </span>
            <span className={styles.currencySymbol}>
              {currencyData.toCurrency}
            </span>
          </div>
          <select
            name="toCurrency"
            id="toCurrency"
            className={styles.currencyDropdown}
            value={currencyData.toCurrency}
            onChange={handleChange}
          >
            {currencySymbols && (
              <>
                {/* Render top currencies first */}
                {topToCurrencyCodes
                  .filter((code) => currencySymbols[code])
                  .map((code) => (
                    <option key={code} value={code}>
                      {currencySymbols[code]} - {code}
                    </option>
                  ))}

                {/* Render the rest alphabetically, excluding the top ones */}
                {Object.entries(currencySymbols)
                  .filter(([code]) => !topToCurrencyCodes.includes(code))
                  .sort((a, b) => a[0].localeCompare(b[0]))
                  .map(([code, name]) => (
                    <option key={code} value={code}>
                      {name} - {code}
                    </option>
                  ))}
              </>
            )}
          </select>
        </div>
      </form>
      <p>
        The rate you get here is approximate. Rates change throughout the day.
      </p>
    </div>
  );
};

export default CurrencyCalculator;
