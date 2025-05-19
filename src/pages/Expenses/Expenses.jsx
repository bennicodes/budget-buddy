import { useState } from "react";
import AddExpense from "../../components/AddExpense/AddExpense";
import Modal from "../../components/Modal/Modal";
import styles from "./Expenses.module.css";

const Expenses = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <Modal contentClassName={styles.addExpenseModal} isOpen={isOpen}>
        <AddExpense />
      </Modal>
    </div>
  );
};

export default Expenses;
