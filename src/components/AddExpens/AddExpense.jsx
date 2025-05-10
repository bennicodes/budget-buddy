import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { category_options } from "../../data/constants/categories";
import Button from "../Button/Button";
import styles from "./Form.module.css";

const Form = ({ closeModal, addExpense, editExpense, initialExpense }) => {
  const isEdit = Boolean(initialExpense);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // useStates for form fields
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  // Reset form on open if not in edit mode
  useEffect(() => {
    if (initialExpense) {
      // Ensure date is in ISO string format
      const formattedDate = initialExpense.date.slice(0, 10);

      setName(initialExpense.name);
      setAmount(initialExpense.amount);
      setDate(formattedDate);
      setCategory(initialExpense.category);
    } else {
      setName("");
      setAmount("");
      setDate("");
      setCategory("");
    }
    setError("");
    setSuccess("");
  }, [initialExpense]);

  // Validation logic
  const handleValidation = () => {
    if (!name.trim()) return setError("Expense name is required!");
    if (!amount || isNaN(amount))
      return setError("Amount must be a valid number!");
    if (amount <= 0) return setError("Amount must be greater than 0!");

    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    if (!date) return setError("Date is required!");
    if (!dateFormat.test(date)) {
      return setError("Invalid date format. Use YYYY-MM-DD.");
    }

    if (!category) return setError("Please select a category!");
    setError("");
    return true;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!handleValidation()) return;

    const newExpense = {
      id: isEdit ? initialExpense.id : uuidv4(),
      name: name.trim(),
      amount: parseFloat(amount),
      date: date,
      category: category,
    };

    // Call add or edit function based on which state the form is in
    isEdit ? editExpense(newExpense) : addExpense(newExpense);

    // Clear form
    setName("");
    setAmount("");
    setDate("");
    setCategory("");

    setSuccess(
      isEdit ? "Expense edited successfully!" : "Expense added successfully!"
    );
    setTimeout(() => setSuccess(""), 3000);

    // Automatically close modal if in Edit state
    if (isEdit) closeModal();
  };

  const handleClose = () => {
    closeModal();
    setName("");
    setAmount("");
    setDate("");
    setCategory("");
    setError("");
    setSuccess("");
  };

  return (
    <>
      <h2 className={styles.formHeader}>
        {isEdit ? "Edit Expense" : "Add New Expense"}
      </h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="expenseName">Expense Name:</label>
          <input
            type="text"
            id="expenseName"
            name="expenseName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Electricity Bill"
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="expenseAmount">Amount:</label>
          <input
            type="number"
            id="expenseAmount"
            name="expenseAmount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 1000"
            min={0}
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="expenseDate">Due Date:</label>
          <input
            type="date"
            id="expenseDate"
            name="expenseDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="expenseCategory">Category:</label>
          <select
            id="expenseCategory"
            name="expenseCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.formSelect}
          >
            <option value="">Select Category</option>
            {category_options.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <div className={styles.buttonContainer}>
          <Button
            type="submit"
            className={`${styles.formButton} ${styles.submitButton}`}
          >
            {isEdit ? "Edit Expense" : "Add Expense"}
          </Button>
          <Button
            type="button"
            onClick={handleClose}
            className={`${styles.formButton} ${styles.closeButton}`}
          >
            Close
          </Button>
        </div>
      </form>
    </>
  );
};

export default Form;
