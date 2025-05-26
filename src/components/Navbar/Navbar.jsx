import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import { useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAuthContext } from "../../context/AuthContext";
import { getAuthInstance } from "../../firebaseConfig";
import Button from "../Button/Button";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownTimer = useRef(null);

  const { user } = getAuthContext();
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimer.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => {
      setShowDropdown(false);
    }, 100);
  };

  const handleMenuToggle = (e) => {
    setIsMenuActive((prev) => !prev);
  };

  const handleSignOut = async () => {
    try {
      await signOut(getAuthInstance());
      setShowDropdown(false);
      navigate("/sign-in");
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error.message);
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
          to="/expenses"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Expenses
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Contact
        </NavLink>
      </div>
      <div className={styles.navbarIconsContainer}>
        <div
          className={styles.profileDropdownWrapper}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faUser} className={styles.profileIcon} />
          <div
            className={`${styles.profileDropDown} ${
              showDropdown ? styles.profileDropDownVisible : ""
            }`}
          >
            <div className={styles.arrowUp}></div>
            {user && (
              <Link to="/account" className={styles.dropdownLink}>
                Account
              </Link>
            )}
            {user ? (
              <Button className={styles.signOutButton} onClick={handleSignOut}>
                Sign out
              </Button>
            ) : (
              <Link to="/sign-in" className={styles.dropdownLink}>
                Sign in
              </Link>
            )}
          </div>
        </div>
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
