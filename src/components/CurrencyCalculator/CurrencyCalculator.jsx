import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Button from "../Button/Button";
import styles from "./CurrencyCalculator.module.css";

const CurrencyCalculator = () => {
  const [currencyData, setCurrencyData] = useState({
    fromCurrency: "USD",
    toCurrency: "NOK",
  });

  return (
    <>
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
              />
              <span className={styles.currencySymbol}>USD</span>
            </div>
            <select id="fromCurrency" className={styles.currencyDropdown}>
              <option value="USD">American Dollar - USD</option>
              <option value="EUR">Euro - EUR</option>
              <option value="GBP">Great Britain Pound - GBP</option>
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
              <input
                type="number"
                name="toAmount"
                id="toAmount"
                className={styles.amountInput}
              />
              <span className={styles.currencySymbol}>USD</span>
            </div>
            <select id="toCurrency" className={styles.currencyDropdown}>
              <option value="USD">American Dollar - USD</option>
              <option value="EUR">Euro - EUR</option>
              <option value="GBP">Great Britain Pound - GBP</option>
            </select>
          </div>
        </form>
      </div>
    </>
  );
};

export default CurrencyCalculator;
