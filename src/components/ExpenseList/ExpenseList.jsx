import ExpenseItem from "../ExpenseItem/ExpenseItem";
import styles from "./ExpenseList.module.css";

const ExpenseList = ({
  expenses,
  onEdit,
  openDeleteModal,
  showActions = true,
}) => {
  return (
    <div className={styles.expenseListContainer}>
      <div className={styles.listScrollWrapper}>
        {expenses.length > 0 ? (
          <table className={styles.expenseTable}>
            <thead>
              <tr className={styles.tableHeadRow}>
                <th>Name</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
                {showActions && (
                  <th className={styles.actionHeading}>Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <ExpenseItem
                  key={expense.id}
                  expense={expense}
                  onEdit={onEdit}
                  openDeleteModal={openDeleteModal}
                  showActions={showActions}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.message}>No expenses recorded yet!</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
