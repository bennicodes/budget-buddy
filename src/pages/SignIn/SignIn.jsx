import { NavLink } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./SignIn.module.css";

const SignIn = () => {
  return (
    <div className={styles.signInContainer}>
      <form className={styles.signInForm}>
        <h1 className={styles.title}>Sign in</h1>
        <div className={styles.inputsContainer}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Email</label>
            <input type="mail" placeholder="Enter email here" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter password here" />
          </div>
        </div>
        <Button className={styles.signInButton}>Sign in</Button>
        <p className={styles.signUp}>
          Need an account? Sign up <NavLink to="/sign-up">here</NavLink>
        </p>
        <p className={styles.forgotPassword}>
          Forgot your password? Click{" "}
          <NavLink to="forgot-password">here</NavLink>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
