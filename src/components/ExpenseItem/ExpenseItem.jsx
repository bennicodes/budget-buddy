import Button from "../Button/Button"; // Import Button component
import styles from "./ExpenseItem.module.css";

const ExpenseItem = ({ expense, onEdit, openDeleteModal }) => {
  const formattedDate = new Date(expense.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const capitalizedCategory =
    expense.category.charAt(0).toUpperCase() + expense.category.slice(1);

  return (
    <tr className={styles.expenseRow}>
      <td>{expense.name}</td>
      <td>{capitalizedCategory}</td>
      <td>{formattedDate}</td>
      <td>${expense.amount}</td>
      <td className={styles.actionContainer}>
        <Button
          type="button"
          className={`${styles.actionButton} ${styles.editButton}`}
          onClick={() => onEdit(expense)}
        >
          Edit
        </Button>
        <Button
          type="button"
          className={`${styles.actionButton} ${styles.deleteButton}`}
          onClick={() => openDeleteModal(expense.id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default ExpenseItem;
