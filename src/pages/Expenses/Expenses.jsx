import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import AddExpense from "../../components/AddExpense/AddExpense";
import Button from "../../components/Button/Button";
import CategoryPieChart from "../../components/ExpenseChart/CategoryPieChart";
import ExpenseList from "../../components/ExpenseList/ExpenseList";
import Modal from "../../components/Modal/Modal";
import SortByMonth from "../../components/SortByMonth/SortByMonth";
import Spinner from "../../components/Spinner/Spinner";
import TotalExpenses from "../../components/TotalExpenses/TotalExpenses";
import { getAuthInstance, getDatabaseInstance } from "../../firebaseConfig";
import useFetchExpenses from "../../hooks/useFetchExpenses";
import styles from "./Expenses.module.css";

const Expenses = () => {
  // State variables
  const [isOpen, setIsOpen] = useState(false);
  const { expenses, loading, error } = useFetchExpenses();
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState("");

  const handleOpenModal = () => {
    setIsOpen(true);
    setSelectedExpense(null);
    setSelectedExpenseId(null);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedExpense(null);
    setSelectedExpenseId(null);
  };

  const handleOpenDeleteModal = (expense) => {
    setExpenseToDelete(expense);
    setIsDeleteOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setExpenseToDelete(null);
    setIsDeleteOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!expenseToDelete) return;
    let timer;
    try {
      const database = getDatabaseInstance();
      const auth = getAuthInstance();
      const userId = auth.currentUser?.uid;
      await deleteDoc(
        doc(database, "users", userId, "expenses", expenseToDelete.id)
      );
      setDeleteMessage(`${expenseToDelete.name} deleted successfully.`);
      timer = setTimeout(() => {
        setDeleteMessage("");
        handleCloseDeleteModal();
      }, 2500);
    } catch (error) {
      setDeleteMessage("Failed to delete expense.");
      clearTimeout(timer);
    }
  };

  const filteredExpenses = expenses.filter((expense) => {
    const expenseMonth = new Date(expense.date).getMonth() + 1;
    return expenseMonth === Number(selectedMonth);
  });

  return (
    <div className={styles.expensesWrapper}>
      {/* Add/Edit modal */}
      <Modal contentClassName={styles.addExpenseModal} isOpen={isOpen}>
        <AddExpense
          closeModal={handleCloseModal}
          isEditing={!!selectedExpense}
          existingExpense={selectedExpense}
          expenseId={selectedExpense?.id}
        />
      </Modal>
      <header className={styles.header}>
        <div className={styles.totalExpensesWrapper}>
          <TotalExpenses expenses={expenses} />
        </div>
        <div className={styles.pieChartWrapper}>
          <CategoryPieChart expenses={expenses} />
        </div>
      </header>
      {/* Expenses list -------------------------- */}
      <main>
        <div className={styles.expenseListWrapper}>
          <div className={styles.expenseListHeader}>
            <h2 className={styles.title}>Expenses</h2>
            <Button
              className={styles.openModalButton}
              onClick={handleOpenModal}
              aria-label="Open add expense modal"
            >
              Add expense
            </Button>
          </div>
          <div className={styles.filterContainer}>
            <SortByMonth
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
            />
          </div>
          {loading && <Spinner />}
          {error && <p className={styles.errorMessage}>{error}</p>}
          {!loading && (
            <ExpenseList
              expenses={selectedMonth ? filteredExpenses : expenses}
              onEdit={(expense) => {
                setSelectedExpense(expense);
                setIsOpen(true);
              }}
              openDeleteModal={handleOpenDeleteModal}
            />
          )}
        </div>
      </main>
      {/* Delete modal ----------------------------- */}
      <Modal
        contentClassName={styles.deleteModal}
        isOpen={isDeleteOpen}
        closeModal={handleCloseDeleteModal}
      >
        <h2 className={styles.deleteTitle}>Confirm Delete</h2>
        <p className={styles.deleteMessage}>
          Are you sure you want to delete{" "}
          <strong>"{expenseToDelete?.name}"</strong>?
        </p>
        <div className={styles.buttonContainer}>
          <Button
            type="button"
            onClick={handleConfirmDelete}
            className={`${styles.button} ${styles.confirm}`}
          >
            Delete
          </Button>
          <Button
            type="button"
            onClick={handleCloseDeleteModal}
            className={`${styles.button} ${styles.cancel}`}
          >
            Cancel
          </Button>
        </div>
        {deleteMessage && (
          <p className={styles.deleteMessage}>{deleteMessage}</p>
        )}
      </Modal>
    </div>
  );
};

export default Expenses;
