import CurrencyCalculator from "../../components/CurrencyCalculator/CurrencyCalculator";
import CategoryPieChart from "../../components/ExpenseChart/CategoryPieChart";
import TotalExpenses from "../../components/TotalExpenses/TotalExpenses";
import useFetchExpenses from "../../hooks/useFetchExpenses";
import styles from "./Home.module.css";

const Home = () => {
  const { expenses } = useFetchExpenses();
  return (
    <div className={styles.rootContainer}>
      <header className={styles.header}>
        <div className={styles.totalExpensesWrapper}>
          <TotalExpenses />
        </div>
        <div className={styles.pieChartWrapper}>
          <CategoryPieChart expenses={expenses} />
        </div>
      </header>
      <main>
        <CurrencyCalculator />
      </main>
    </div>
  );
};

export default Home;
