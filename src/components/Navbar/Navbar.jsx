import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/transactions"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Transactions
      </NavLink>

      <NavLink
        to="/contact"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Contact
      </NavLink>
    </nav>
  );
};

export default Navbar;
