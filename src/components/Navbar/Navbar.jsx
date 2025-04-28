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
        to="/services"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Services
      </NavLink>
      <NavLink
        to="/team"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Team
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
