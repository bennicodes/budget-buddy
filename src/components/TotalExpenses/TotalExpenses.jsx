import styles from "./TotalExpenses.module.css";

const TotalExpenses = ({ total }) => {
  return (
    <div className={styles.totalExpensesWrapper}>
      <h3>Total Expenses:</h3>
      <span className={styles.totalAmount}>$2000</span>
    </div>
  );
};

export default TotalExpenses;
