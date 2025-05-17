import CurrencyCalculator from "../../components/CurrencyCalculator/CurrencyCalculator";
import TotalExpenses from "../../components/TotalExpenses/TotalExpenses";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.rootContainer}>
      <header className={styles.header}>
        <TotalExpenses />
      </header>
      <main>
        <CurrencyCalculator />
      </main>
    </div>
  );
};

export default Home;
