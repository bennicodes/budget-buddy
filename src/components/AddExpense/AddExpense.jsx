import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { categories } from "../../data/categories";
import { database } from "../../firebaseConfig";
import useAddExpenseValidation from "../../hooks/useAddExpenseValidation";
import Button from "../Button/Button";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./AddExpense.module.css";

const AddExpense = () => {
  const [formData, setFormData] = useState({
    expenseName: "",
    expenseAmount: "",
    expenseDate: "",
    expenseCategory: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  // Validation
  const { validateAddForm, addExpenseErrors } = useAddExpenseValidation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { expenseName, expenseAmount, expenseDate, expenseCategory } =
      formData;
    setErrorMessage("");

    if (!validateAddForm(formData)) {
      return;
    }

    try {
      const expensesRef = collection(database, "expenses");
      await addDoc(expensesRef, {
        name: expenseName,
        amount: expenseAmount,
        date: expenseDate,
        category: expenseCategory,
        createdAt: serverTimestamp(),
      }),
        // Reset form
        setFormData({
          expenseName: "",
          expenseAmount: "",
          expenseDate: "",
          expenseCategory: "",
        });
      setMessage("Expense added successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setErrorMessage("Failed to add expense.");
    }
  };

  return (
    <form className={styles.addExpenseForm} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Add Expense</h2>
      <div className={styles.formGroup}>
        <label htmlFor="expenseName">Name:</label>
        <input
          type="text"
          name="expenseName"
          id="expenseName"
          placeholder="Rent"
          onChange={handleChange}
          value={formData.expenseName}
          className={addExpenseErrors.expenseName ? styles.inputError : ""}
        />
        {addExpenseErrors.expenseName && (
          <ErrorMessage
            className={styles.errorMessage}
            message={addExpenseErrors.expenseName}
          />
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="expenseAmount">Amount:</label>
        <input
          type="number"
          name="expenseAmount"
          id="expenseAmount"
          placeholder="2000"
          min={0}
          className={`${styles.amountInput} ${
            addExpenseErrors.expenseAmount ? styles.inputError : ""
          }`}
          onChange={handleChange}
          value={formData.expenseAmount}
        />
        {addExpenseErrors.expenseAmount && (
          <ErrorMessage
            className={styles.errorMessage}
            message={addExpenseErrors.expenseAmount}
          />
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="expenseDate">Date:</label>
        <input
          type="date"
          name="expenseDate"
          id="expenseDate"
          onChange={handleChange}
          value={formData.expenseDate}
          className={addExpenseErrors.expenseDate ? styles.inputError : ""}
        />
        {addExpenseErrors.expenseDate && (
          <ErrorMessage
            className={styles.errorMessage}
            message={addExpenseErrors.expenseDate}
          />
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="expenseCategory">Category:</label>
        <select
          name="expenseCategory"
          id="expenseCategory"
          className={`${styles.categoryDropdown} ${
            addExpenseErrors.expenseCategory ? styles.dropDownError : ""
          }}`}
          onChange={handleChange}
          value={formData.expenseCategory}
        >
          <option value="">Select category</option>
          {categories.map((category) => {
            return (
              <option
                key={category.toLocaleLowerCase()}
                value={category.toLocaleLowerCase()}
              >
                {category}
              </option>
            );
          })}
        </select>
        {addExpenseErrors.expenseCategory && (
          <ErrorMessage
            className={styles.errorMessage}
            message={addExpenseErrors.expenseCategory}
          />
        )}
      </div>
      {message && <p className={styles.successMessage}>{message}</p>}
      {/* --------------------- */}
      {errorMessage && <ErrorMessage message={errorMessage}></ErrorMessage>}
      <div className={styles.buttonContainer}>
        <Button className={styles.formButton} type="submit">
          Add Expense
        </Button>
        <Button className={styles.formButton} type="button">
          Close
        </Button>
      </div>
    </form>
  );
};

export default AddExpense;
