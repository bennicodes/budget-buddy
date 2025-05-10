import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import { auth } from "../../firebaseConfig";
import styles from "./SignUp.module.css";

const SignUp = () => {
  // Declaring state variables
  const [signUpFormData, setSignUpFormData] = useState({
    firstname: "",
    lastname: "",
    dateOfBirth: "",
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
    setSignUpFormData((prevData) => ({
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
    setSignUpFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSignUp = async (e, email, password) => {
    e.preventDefault();
    setError(null);
    if (
      !signUpFormData.firstname.trim() ||
      !signUpFormData.lastname.trim() ||
      !signUpFormData.email.trim() ||
      !signUpFormData.password.trim() ||
      !signUpFormData.confirmPassword.trim()
    ) {
      setError("Please fill the empty fields.");
      return;
    } else if (signUpFormData.password !== signUpFormData.confirmPassword) {
      setError("Passwords do not match");
      return;
    } else if (!signUpFormData.terms) {
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
      setSignUpFormData({
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
    <>
      <Link to="/sign-in" className={styles.goBackLink}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back to sign in
      </Link>
      <div className={styles.signUpContainer}>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>Sign Up</h1>
          <form
            className={styles.signUpForm}
            onSubmit={(e) =>
              handleSignUp(e, signUpFormData.email, signUpFormData.password)
            }
          >
            <div className={styles.formFieldsRow}>
              <fieldset className={styles.formGroup}>
                <legend>Personal Information</legend>
                <div className={styles.inputGroup}>
                  <label htmlFor="firstname">First name</label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    onChange={handleChange}
                    value={signUpFormData.firstname}
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
                    value={signUpFormData.lastname}
                    placeholder="Smith"
                  />
                </div>
                {/* ------------- */}
                <div className={styles.inputGroup}>
                  <label htmlFor="dateOfBirth">Date of birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    onChange={handleChange}
                    value={signUpFormData.dateOfBirth}
                  />
                </div>
              </fieldset>
              {/* ------------- */}
              <fieldset className={styles.formGroup}>
                <legend>Account Information</legend>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={signUpFormData.email}
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
                    value={signUpFormData.password}
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
                    value={signUpFormData.confirmPassword}
                    placeholder="Re-enter your password"
                  />
                </div>
              </fieldset>
            </div>
            {/* ------------- */}
            <div className={styles.term}>
              <input
                type="checkbox"
                name="terms"
                id="terms"
                onChange={handleCheckboxChange}
                checked={signUpFormData.terms}
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
            <div className={styles.buttonContainer}>
              <Button className={styles.signUpButton} type="submit">
                {isLoading ? <Spinner /> : "Sign up"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
