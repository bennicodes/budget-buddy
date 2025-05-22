import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../firebaseConfig";

const useFetchExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const expenseRef = collection(database, "expenses");
    const q = query(expenseRef, orderBy("createdAt", "desc"));
    // Real time updates
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const expenseList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExpenses(expenseList);
        setLoading(false);
      },

      (err) => {
        setError("Failed to fetch expenses.");
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return { expenses, loading, error };
};

export default useFetchExpenses;
