import styles from "./TotalExpenses.module.css";

const TotalExpenses = ({ expenses }) => {
  const total = expenses?.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  return (
    <div className={styles.totalExpensesWrapper}>
      <h3 className={styles.title}>Total expenses:</h3>
      <span className={styles.amount}>${total?.toFixed(2)}</span>
    </div>
  );
};

export default TotalExpenses;
