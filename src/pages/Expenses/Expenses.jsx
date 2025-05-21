import { useState } from "react";
import AddExpense from "../../components/AddExpense/AddExpense";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import styles from "./Expenses.module.css";

const Expenses = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.expensesWrapper}>
      <h2 className={styles.title}>Expenses</h2>
      <Button onClick={() => setIsOpen(true)}>Add expense</Button>
      <Modal contentClassName={styles.addExpenseModal} isOpen={isOpen}>
        <AddExpense closeModal={setIsOpen} />
      </Modal>
    </div>
  );
};

export default Expenses;
