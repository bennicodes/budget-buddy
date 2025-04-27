import Button from "../Button/Button";
import ExpenseItem from "../ExpenseItem/ExpenseItem";
import Modal from "../Modal/Modal";
import styles from "./DeleteModal.module.css";

const DeleteModal = ({ isOpen, closeModal, confirmDelete, expenseName }) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <h2 className={styles.title}>Confirm Delete</h2>
      <p className={styles.deleteMessage}>
        Are you sure you want to delete <strong>"{expenseName}"</strong>?
      </p>
      <div className={styles.buttonContainer}>
        <Button
          type="button"
          onClick={confirmDelete}
          className={`${styles.button} ${styles.confirm}`}
        >
          Delete
        </Button>
        <Button
          type="button"
          onClick={closeModal}
          className={`${styles.button} ${styles.cancel}`}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
