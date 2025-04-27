import ExpenseItem from "../ExpenseItem/ExpenseItem";
import styles from "./ExpenseList.module.css";

const ExpenseList = ({ expenses, onEdit, openDeleteModal }) => {
  return (
    <div className={styles.expenseListContainer}>
      {expenses.length > 0 ? (
        <div className={styles.tableScrollWrapper}>
          <table className={styles.expenseTable}>
            <thead>
              <tr className={styles.tableHeadRow}>
                <th>Name</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <ExpenseItem
                  key={expense.id}
                  expense={expense}
                  onEdit={onEdit}
                  openDeleteModal={openDeleteModal}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={styles.expenseParagraph}>No expenses recorded yet!</p>
      )}
    </div>
  );
};

export default ExpenseList;
