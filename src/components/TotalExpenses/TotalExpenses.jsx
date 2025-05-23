import styles from "./TotalExpenses.module.css";

const TotalExpenses = ({ expenses }) => {
  const now = new Date();

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const totalThisMonth = expenses
    ?.filter((expense) => {
      const expenseDate = new Date(expense.createdAt?.seconds * 1000);
      return expenseDate >= startOfMonth;
    })
    .reduce((sum, expense) => sum + Number(expense.amount), 0);

  return (
    <div className={styles.totalExpensesWrapper}>
      <h3 className={styles.title}>Total expenses this month:</h3>
      <span className={styles.amount}>${totalThisMonth?.toFixed(2)}</span>
    </div>
  );
};

export default TotalExpenses;
