import AddExpense from "../../components/AddExpense/AddExpense";
import Modal from "../../components/Modal/Modal";
import styles from "./Expenses.module.css";

const Expenses = () => {
  return (
    <div>
      <Modal>
        <AddExpense />
      </Modal>
    </div>
  );
};

export default Expenses;
