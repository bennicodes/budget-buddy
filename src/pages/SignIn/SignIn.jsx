import { NavLink, useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";
// Import components
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Button from "../../components/Button/Button";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import { auth } from "../../firebaseConfig";
import useSignInValidation from "../../hooks/useSignInValidation";

const SignIn = () => {
  // State variables
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Destructure validation
  const { validateSignIn, signInErrors } = useSignInValidation();

  const navigate = useNavigate();

  // Retrieve form values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignInFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateSignIn(signInFormData)) {
      console.log("Form invalid");
      return;
    }
    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signInFormData.email,
        signInFormData.password
      );
      const user = userCredential.user;
      navigate("/");
      console.log("User successfully signed in:", user);
    } catch (error) {
      setError("Invalid email or password.");
      console.log("Error signing in:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.signInWrapper}>
      <form className={styles.signInForm} onSubmit={handleSignIn} noValidate>
        <h1 className={styles.title}>Sign in</h1>
        <div className={styles.inputsContainer}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              value={signInFormData.email}
              onChange={handleInputChange}
            />
            {signInErrors.email && (
              <ErrorMessage
                className={styles.signInErrorMessage}
                message={signInErrors.email}
              />
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              value={signInFormData.password}
              onChange={handleInputChange}
            />
            {signInErrors.password && (
              <ErrorMessage
                className={styles.signInErrorMessage}
                message={signInErrors.password}
              />
            )}
          </div>
        </div>
        {error && (
          <ErrorMessage className={styles.signInErrorMessage} message={error} />
        )}
        <Button className={styles.signInButton} type="submit">
          {/* Show spinner when loading */}
          {isLoading ? (
            <Spinner
              wrapperClassName={styles.spinnerWrapper}
              spinnerClassName={styles.spinnerCircle}
            />
          ) : (
            "Sign in"
          )}
        </Button>
        <p className={styles.forgotPassword}>
          <NavLink to="forgot-password">Forgot your password?</NavLink>
        </p>
        <p className={styles.signUpLink}>
          <NavLink to="/sign-up">Don´t have an account? Sign up</NavLink>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
