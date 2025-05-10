import Transactions from "../Transactions/Transactions";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.rootContainer}>
      <header className={styles.header}>
        <h1>Budget Buddy</h1>
        Navbar
      </header>
      <main>
        <div className={styles.transactionsContainer}>
          <Transactions />
        </div>
      </main>
    </div>
  );
};

export default Home;
