import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
// Import components
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className={styles.rootContainer}>
      <header className={styles.header}>
        <Navbar />
      </header>
      <main className={styles.mainContainer}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
