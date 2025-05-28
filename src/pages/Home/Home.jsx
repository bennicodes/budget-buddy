import { useState } from "react";
import CurrencyCalculator from "../../components/CurrencyCalculator/CurrencyCalculator";
import CategoryPieChart from "../../components/ExpenseChart/CategoryPieChart";
import ExpenseList from "../../components/ExpenseList/ExpenseList";
import Spinner from "../../components/Spinner/Spinner";
import TotalExpenses from "../../components/TotalExpenses/TotalExpenses";
import useFetchExpenses from "../../hooks/useFetchExpenses";
import styles from "./Home.module.css";

const Home = () => {
  const { expenses, loading, error } = useFetchExpenses();

  const latestExpenses = [...expenses]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <>
      {loading ? (
        <Spinner wrapperClassName={styles.spinnerWrapper} />
      ) : error ? (
        <p className={styles.errorMessage}>{error}</p>
      ) : (
        <div className={styles.rootContainer}>
          <header className={styles.header}>
            <div className={styles.totalExpensesWrapper}>
              <TotalExpenses expenses={expenses} />
            </div>
            <div className={styles.pieChartWrapper}>
              <CategoryPieChart expenses={expenses} />
            </div>
          </header>
          <main>
            <div className={styles.expensesWrapper}>
              <ExpenseList expenses={latestExpenses} showActions={false} />
            </div>
            <div className={styles.calculatorWrapper}>
              <CurrencyCalculator />
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default Home;
