import { useState } from "react";

const useAddExpenseValidation = () => {
  const [addExpenseErrors, setAddExpenseErrors] = useState({});
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format

  const validateAddForm = (values) => {
    let newErrors = {};

    if (!values.expenseName.trim()) {
      newErrors.expenseName = "Please enter an expense name";
    }
    if (!values.expenseAmount.trim()) {
      newErrors.expenseAmount = "Please enter an expense amount";
    } else if (isNaN(values.expenseAmount)) {
      newErrors.expenseAmount = "Expense amount must be a number";
    }
    if (!values.expenseDate.trim()) {
      newErrors.expenseDate = "Please enter an expense date";
    } else if (!dateRegex.test(values.expenseDate)) {
      newErrors.expenseDate = "Expense date must be in YYYY-MM-DD format";
    }
    if (!values.expenseCategory.trim()) {
      newErrors.expenseCategory = "Please select an expense category";
    }

    setAddExpenseErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return { validateAddForm, addExpenseErrors };
};

export default useAddExpenseValidation;
