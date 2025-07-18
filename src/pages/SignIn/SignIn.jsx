import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";
// Import components
import Button from "../../components/Button/Button";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Modal from "../../components/Modal/Modal";
import Spinner from "../../components/Spinner/Spinner";
import { getAuthInstance } from "../../firebaseConfig";
import { useAuth } from "../../hooks/useAuth";
import useSignInValidation from "../../hooks/useSignInValidation";

const SignIn = () => {
  // State variables
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailError, setResetEmailError] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [resetErrorMessage, setResetErrorMessage] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const { signIn, signInErrors: authErrors, isLoading } = useAuth();
  const { validateSignIn, signInErrors } = useSignInValidation();

  const navigate = useNavigate();

  // Retrieve form values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignInFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateSignIn(signInFormData)) return;

    try {
      const userCredential = await signIn(
        signInFormData.email,
        signInFormData.password
      );
      const user = userCredential.user;
      navigate("/");
      console.log("Sign in successful");
    } catch (error) {
      console.log("Error signing in:", error.message);
    }
  };

  // Reset password
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!resetEmail.trim()) {
      setResetErrorMessage("Email is required to reset password");
      setResetEmailError(true);
      return;
    } else if (!emailRegex.test(resetEmail.trim())) {
      newErrors.email = "Please enter a valid email address";
      setResetEmailError(true);
      return;
    }
    setResetEmailError(false);
    setResetErrorMessage("");

    try {
      await sendPasswordResetEmail(getAuthInstance(), resetEmail);
      setResetMessage("Reset email has been sent. Please check your inbox.");
      setResetEmail("");
    } catch (error) {
      setResetMessage("Error sending password reset email. Please try again.");
      console.error("Error sending password reset email:", error);
    }
  };
  // Close reset modal
  const closeResetModal = () => {
    setShowForgotPasswordModal(false);
    setResetMessage("");
    setResetEmail("");
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
        {authErrors && (
          <ErrorMessage
            className={styles.signInErrorMessage}
            message={authErrors}
          />
        )}
        <Button className={styles.signInButton} type="submit">
          {/* Show spinner when loading */}
          {isLoading ? (
            <Spinner spinnerClassName={styles.spinnerCircle} />
          ) : (
            "Sign in"
          )}
        </Button>
        <p className={styles.forgotPassword}>
          <Button
            type="button"
            className={styles.forgotPasswordButton}
            onClick={() => setShowForgotPasswordModal(true)}
          >
            Forgot your password?
          </Button>
        </p>
        <p className={styles.signUpLink}>
          <Link to="/sign-up">Don´t have an account? Sign up</Link>
        </p>
      </form>
      {/* -------------------------- */}
      {/* Forgot password modal */}
      <Modal
        contentClassName={styles.resetModalContent}
        isOpen={showForgotPasswordModal}
        closeModal={closeResetModal}
      >
        <form className={styles.resetFormContainer}>
          <h3 className={styles.resetTitle}>Reset Password</h3>
          <p>
            Please enter your email address and press "reset". You will receive
            an email with a link to reset your password.
          </p>
          <input
            type="email"
            name="resetEmail"
            id="resetEmail"
            placeholder="Enter your email address"
            className={`${styles.resetInput} ${
              resetEmailError ? styles.resetInputError : ""
            }`}
            onChange={(e) => setResetEmail(e.target.value)}
            value={resetEmail}
          />
          {resetMessage && (
            <ErrorMessage
              className={styles.resetMessage}
              message={resetMessage}
            />
          )}
          {resetErrorMessage && (
            <ErrorMessage
              className={styles.resetErrorMessage}
              message={resetErrorMessage}
            />
          )}
          <div className={styles.resetButtonsContainer}>
            <Button
              className={styles.resetPasswordButton}
              onClick={handlePasswordReset}
              type="submit"
            >
              Reset Password
            </Button>
            <Button
              className={styles.closeButton}
              type="button"
              onClick={closeResetModal}
            >
              Close
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default SignIn;
