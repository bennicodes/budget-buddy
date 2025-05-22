import Button from "../Button/Button";
import styles from "./ExpenseItem.module.css";

const ExpenseItem = ({ expense, onEdit, openDeleteModal }) => {
  const formattedDate = new Date(expense.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <tr className={styles.expenseRow}>
      <td>{capitalize(expense.name)}</td>
      <td>{capitalize(expense.category)}</td>
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
          onClick={() => openDeleteModal(expense)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default ExpenseItem;
