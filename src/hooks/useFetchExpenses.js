import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, database } from "../firebaseConfig";

const useFetchExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      setExpenses([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const expenseRef = collection(database, "users", userId, "expenses");
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
        console.error("Firestore fetch error:", err);
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
