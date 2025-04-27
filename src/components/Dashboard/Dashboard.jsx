import React from "react";
import Button from "../Button/Button";
import Filter from "../CategoryTabs/CategoryTabs";
import TotalExpenses from "../TotalExpenses/TotalExpenses";
import styles from "./Dashboard.module.css";

const Dashboard = ({ openModal, totalExpenses }) => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardContainer}>
        <h1 className={styles.mainTitle}>Expense Tracker</h1>
        <Button onClick={openModal} className={styles.addButton}>
          Add
        </Button>
      </div>
      <TotalExpenses total={totalExpenses} />
    </div>
  );
};

export default Dashboard;
