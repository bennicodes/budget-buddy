import React from "react";
import "./TotalExpenses.css";

const TotalExpenses = ({ total }) => {
  return (
    <div className="totalExpenseContainer">
      <h4>Total Expenses:</h4>
      <span className="totalAmount">${total.toFixed(2)}</span>
    </div>
  );
};

export default TotalExpenses;
