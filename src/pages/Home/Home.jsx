import CurrencyCalculator from "../../components/CurrencyCalculator/CurrencyCalculator";
import CategoryPieChart from "../../components/ExpenseChart/CategoryPieChart";
import ExpenseList from "../../components/ExpenseList/ExpenseList";
import TotalExpenses from "../../components/TotalExpenses/TotalExpenses";
import useFetchExpenses from "../../hooks/useFetchExpenses";
import styles from "./Home.module.css";

const Home = () => {
  const { expenses } = useFetchExpenses();

  // Sort and get only the 3 latest expenses
  const latestExpenses = [...expenses]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
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
        <div className={styles.expensesWrapper}>
          <ExpenseList expenses={expenses.slice(0, 3)} />
        </div>
        <div className={styles.calculatorWrapper}>
          <CurrencyCalculator />
        </div>
      </main>
    </div>
  );
};

export default Home;
