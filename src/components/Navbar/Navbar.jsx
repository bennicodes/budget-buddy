import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const handleMenuToggle = (e) => {
    setIsMenuActive((prev) => !prev);
    if (e.target.classList.contains(styles.menuIcon)) {
      setIsMenuActive((prev) => !prev);
    }
  };

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.navbarTitle}>
        <NavLink to="/" className={styles.titleLink}>
          Budget Buddy
        </NavLink>
      </h1>
      <div
        className={`${styles.navLinkContainer} ${
          isMenuActive ? styles.navLinkContainerActive : ""
        }`}
      >
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
      <div className={styles.navbarIconsContainer}>
        <FontAwesomeIcon icon={faUser} className={styles.profileIcon} />
        <FontAwesomeIcon
          icon={faBars}
          className={styles.menuIcon}
          onClick={handleMenuToggle}
        />
      </div>
    </nav>
  );
};

export default Navbar;
