import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
// Import components
import Navbar from "./components/Navbar/Navbar";

function App() {
  // State variables
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState(0); // 0 = All months

  const hasMounted = useRef(false);

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  useEffect(() => {
    if (hasMounted.current) {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    } else {
      hasMounted.current = true;
    }
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const editExpense = (updatedExpense) => {
    const normalizedExpense = {
      ...updatedExpense,
      date: new Date(updatedExpense.date).toISOString().slice(0, 10),
    };

    const updatedExpenses = expenses.map((expense) =>
      expense.id === normalizedExpense.id ? normalizedExpense : expense
    );

    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === normalizedExpense.id ? normalizedExpense : expense
      )
    );
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  //  Category filter + Month filter
  const filteredExpenses = expenses.filter((expense) => {
    const categoryMatch =
      selectedCategory === "All" || expense.category === selectedCategory;

    const month = new Date(expense.date).getMonth() + 1;
    const monthMatch = selectedMonth === 0 || month === selectedMonth;

    return categoryMatch && monthMatch;
  });

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingExpense(null);
  };

  const startEditing = (expense) => {
    setEditingExpense(expense);
    openModal();
  };

  const openDeleteModal = (expenseId) => {
    setSelectedExpenseId(expenseId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedExpenseId(null);
  };

  return (
    <>
      <header>
        {/* <Navbar /> */}
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
