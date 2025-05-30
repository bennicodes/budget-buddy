import Button from "../Button/Button";
import styles from "./ExpenseItem.module.css";

const ExpenseItem = ({
  expense,
  onEdit,
  openDeleteModal,
  showActions = true,
}) => {
  const formattedDate = new Date(expense.date).toLocaleDateString("en-GB", {
    year: "2-digit",
    month: "2-digit",
    day: "numeric",
  });

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <tr className={styles.expenseRow}>
      <td>{capitalize(expense.name)}</td>
      <td>{capitalize(expense.category)}</td>
      <td>{formattedDate}</td>
      <td>${expense.amount}</td>
      {showActions && (
        <td className={styles.actionContainer}>
          <Button
            type="button"
            className={`${styles.actionButton} ${styles.editButton}`}
            onClick={() => onEdit(expense)}
            aria-label={`Edit ${expense.name} expense`}
          >
            Edit
          </Button>
          <Button
            type="button"
            className={`${styles.actionButton} ${styles.deleteButton}`}
            onClick={() => openDeleteModal(expense)}
            aria-label="Open delete modal"
          >
            Delete
          </Button>
        </td>
      )}
    </tr>
  );
};

export default ExpenseItem;
