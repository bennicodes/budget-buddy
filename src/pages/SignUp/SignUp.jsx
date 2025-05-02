// import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import { auth } from "../../firebaseConfig";
import Button from "../../components/Button/Button";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./SignUp.module.css";

const SignUp = () => {
  // Declaring state variables
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [touchedPasswordInput, setTouchedPasswordInput] = useState({
    password: false,
  });
  const [passwordError, setPasswordError] = useState("");

  // For redirecting
  const navigate = useNavigate();

  // Retrieving input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouchedPasswordInput((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      if (value.length < 6) {
        setPasswordError("Password must be at least 6 characters.");
      } else {
        setPasswordError("");
      }
    }
  };
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSignUp = async (e, email, password) => {
    e.preventDefault();
    setError(null);
    if (
      !formData.firstname.trim() ||
      !formData.lastname.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      setError("Please fill the empty fields.");
      return;
    } else if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    } else if (!formData.terms) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    try {
      //   const userCredential = await createUserWithEmailAndPassword(
      //     auth,
      //     email,
      //     password
      //   );
      //   const user = userCredential.user;
      //   console.log("User signed up successfully:", user);

      navigate("/");

      // Reset form
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <p className={styles.signInLink}>
        <NavLink to="/sign-in"> Back to sign in</NavLink>
      </p>
      <form
        className={styles.signUpForm}
        onSubmit={(e) => handleSignUp(e, formData.email, formData.password)}
      >
        <h1 className={styles.title}>Sign Up</h1>
        <div className={styles.inputsContainer}>
          <div className={styles.inputGroup}>
            <label htmlFor="firstname">First name</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              onChange={handleChange}
              value={formData.firstname}
              placeholder="John"
            />
          </div>
          {/* ------------- */}
          <div className={styles.inputGroup}>
            <label htmlFor="lastname">Last name</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              onChange={handleChange}
              value={formData.lastname}
              placeholder="Smith"
            />
          </div>
          {/* ------------- */}
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="you@example.com"
            />
          </div>
          {/* ------------- */}
          <div className={`${styles.inputGroup} ${styles.passwordGroup}`}>
            <label htmlFor="password">Password</label>

            <input
              type="password"
              name="password"
              id="password"
              min={6}
              onChange={handleChange}
              onBlur={handleBlur}
              value={formData.password}
              placeholder="Create a strong password"
            />
            {touchedPasswordInput.password && passwordError ? (
              <ErrorMessage
                message={passwordError}
                className={styles.passwordErrorMessage}
              />
            ) : (
              <p className={styles.passwordDescription}>
                Must be at least 6 characters
              </p>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirm-password">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirm-password"
              min={6}
              onChange={handleChange}
              value={formData.confirmPassword}
              placeholder="Re-enter your password"
            />
          </div>
        </div>
        {/* ------------- */}
        <div className={styles.term}>
          <input
            type="checkbox"
            name="terms"
            id="terms"
            onChange={handleCheckboxChange}
            checked={formData.terms}
          />
          <label htmlFor="terms">I agree to the terms and conditions</label>
        </div>
        {error && (
          <ErrorMessage
            className={styles.errorMessage}
            message={error}
          ></ErrorMessage>
        )}
        {/* ------------- */}
        <Button className={styles.signUpButton} type="submit">
          {isLoading ? <Spinner /> : "Sign up"}
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
