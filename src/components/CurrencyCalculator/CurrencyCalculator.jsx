import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { convertCurrency } from "../../exchangeConfig";
import Button from "../Button/Button";
import styles from "./CurrencyCalculator.module.css";

const CurrencyCalculator = () => {
  const [currencyData, setCurrencyData] = useState({
    fromCurrency: "USD",
    toCurrency: "NOK",
    fromAmount: 1,
    result: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrencyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const convert = async () => {
      const data = await convertCurrency(
        currencyData.fromCurrency,
        currencyData.toCurrency,
        currencyData.fromAmount
      );
      console.log(data);
      setCurrencyData((prevData) => ({
        ...prevData,
        result: data.result,
      }));
    };

    if (currencyData.fromAmount > 0) {
      convert();
    }
  }, [
    // currencyData.fromCurrency,
    // currencyData.toCurrency,
    // currencyData.fromAmount,
  ]);

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
            />
            <span className={styles.currencySymbol}>
              {currencyData.fromCurrency}
            </span>
          </div>
          <select
            id="fromCurrency"
            className={styles.currencyDropdown}
            value={currencyData.fromCurrency}
            onChange={handleChange}
          >
            <option value="USD">American Dollar - USD</option>
            <option value="EUR">Euro - EUR</option>
            <option value="GBP">Great Britain Pound - GBP</option>
            <option value="NOK">Norwegian Krone - NOK</option>
          </select>
        </div>
        <div className={styles.switchContainer}>
          <Button className={styles.switchButton}>
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
            id="toCurrency"
            className={styles.currencyDropdown}
            value={currencyData.toCurrency}
            onChange={handleChange}
          >
            <option value="NOK">Norwegian Krone - NOK</option>
            <option value="USD">American Dollar - USD</option>
            <option value="EUR">Euro - EUR</option>
            <option value="GBP">Great Britain Pound - GBP</option>
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
