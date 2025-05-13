import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.navbarTitle}>
        <NavLink to="/" className={styles.titleLink}>
          Budget Buddy
        </NavLink>
      </h1>
      <div className={styles.navLinkContainer}>
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
      </div>
      <div className={styles.profileIconContainer}>
        <FontAwesomeIcon icon={faUser} />
      </div>
    </nav>
  );
};

export default Navbar;
