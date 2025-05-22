import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import AddExpense from "../../components/AddExpense/AddExpense";
import Button from "../../components/Button/Button";
import ExpenseList from "../../components/ExpenseList/ExpenseList";
import Modal from "../../components/Modal/Modal";
import Spinner from "../../components/Spinner/Spinner";
import { database } from "../../firebaseConfig";
import useFetchExpenses from "../../hooks/useFetchExpenses";
import styles from "./Expenses.module.css";

const Expenses = () => {
  // State variables
  const [isOpen, setIsOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const { expenses, loading, error } = useFetchExpenses();

  return (
    <div className={styles.expensesWrapper}>
      <Modal contentClassName={styles.addExpenseModal} isOpen={isOpen}>
        <AddExpense closeModal={setIsOpen} />
      </Modal>
      <div className={styles.expenseListWrapper}>
        <div className={styles.expenseListHeader}>
          <h2 className={styles.title}>Expenses</h2>
          <Button
            className={styles.openModalButton}
            onClick={() => setIsOpen(true)}
          >
            Add expense
          </Button>
        </div>
        {loading && <Spinner />}
        {error && <p className={styles.errorMessage}>{error}</p>}
        {!loading && <ExpenseList expenses={expenses} />}
      </div>
    </div>
  );
};

export default Expenses;
