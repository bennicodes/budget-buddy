import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";
// Import components
import Button from "../../components/Button/Button";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";

const SignIn = () => {
  // State variables
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    const { email, password } = formData;
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setIsLoading(true);
      // const userCredential = await signInWithEmailAndPassword(
      //   auth,
      //   formData.email,
      //   formData.password
      // );
      // const user = userCredential.user;
      navigate("/");
      console.log("User successfully signed in:");
    } catch (error) {
      setError("Invalid email or password.");
      console.log("Error signing in:", error.message);
    }
  };

  return (
    <div className={styles.signInContainer}>
      <form className={styles.signInForm} onSubmit={handleSignIn}>
        <h1 className={styles.title}>Sign in</h1>
        <div className={styles.inputsContainer}>
          {error && (
            <ErrorMessage className={styles.errorMessage} message={error} />
          )}
          <div className={styles.inputGroup}>
            <label htmlFor="username">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email here"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password here"
              value={formData.password}
              onChange={handleChange}
            />
            <p className={styles.forgotPassword}>
              <NavLink to="forgot-password">Forgot your password?</NavLink>
            </p>
          </div>
        </div>
        <Button className={styles.signInButton} type="submit">
          {isLoading ? <Spinner /> : "Sign in"}
        </Button>
        <p className={styles.signUp}>
          <NavLink to="/sign-up">Don´t have an account? Sign up</NavLink>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
