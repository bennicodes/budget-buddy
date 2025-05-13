import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import { auth } from "../../firebaseConfig";
import { useSignUpValidation } from "../../hooks/useSignUpValidation";
import styles from "./SignUp.module.css";

const SignUp = () => {
  // Declare useState variables
  const [signUpFormData, setSignUpFormData] = useState({
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [touchedPasswordInput, setTouchedPasswordInput] = useState({
    password: false,
    confirmPassword: false,
  });

  const [passwordError, setPasswordError] = useState("");
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,}$/;
  const { validate, errors } = useSignUpValidation();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedPasswordInput((prev) => ({ ...prev, [name]: true }));

    // Password Validation
    if (name === "password") {
      if (signUpFormData.password.length < 8) {
        setPasswordError("Password must be at least 8 characters long");
      } else if (!passwordRegex.test(signUpFormData.password.trim())) {
        setPasswordError(
          "Password must contain at least one uppercase, lowercase, number, and special character"
        );
      } else {
        setPasswordError("");
      }
    }

    // Confirm Password Validation
    if (
      name === "confirmPassword" &&
      signUpFormData.confirmPassword &&
      signUpFormData.password !== signUpFormData.confirmPassword
    ) {
      setPasswordError("Passwords do not match");
    } else if (name === "confirmPassword") {
      setPasswordError("");
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
    setPasswordError("");

    const isValid = validate(signUpFormData);
    if (!isValid) {
      console.log("Form is invalid");
      return;
    }
    // Password Validation
    if (!passwordRegex.test(signUpFormData.password)) {
      setPasswordError(
        "Password must contain at least one uppercase, lowercase, number, and special character"
      );
      return;
    }
    if (signUpFormData.password !== signUpFormData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed up successfully:", user);

      navigate("/");

      setSignUpFormData({
        firstname: "",
        lastname: "",
        dateOfBirth: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
      });
    } catch (error) {
      setErrors(error.message);
      console.log("Error signing up:", error.message);
    } finally {
      setIsLoading(false);
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
                  {errors?.firstname && (
                    <ErrorMessage message={errors.firstname} />
                  )}
                </div>
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
                  {errors?.lastname && (
                    <ErrorMessage message={errors.lastname} />
                  )}
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="dateOfBirth">Date of birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    onChange={handleChange}
                    value={signUpFormData.dateOfBirth}
                  />
                  {errors?.dateOfBirth && (
                    <ErrorMessage message={errors.dateOfBirth} />
                  )}
                </div>
              </fieldset>
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
                  {errors?.email && <ErrorMessage message={errors.email} />}
                </div>
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
                      Must be at least 8 characters
                    </p>
                  )}
                  {errors?.password && (
                    <ErrorMessage message={errors.password} />
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
                    onBlur={handleBlur}
                    value={signUpFormData.confirmPassword}
                    placeholder="Re-enter your password"
                  />
                  {touchedPasswordInput.confirmPassword &&
                    passwordError === "Passwords do not match" && (
                      <ErrorMessage message={passwordError} />
                    )}
                  {errors?.confirmPassword && (
                    <ErrorMessage message={errors.confirmPassword} />
                  )}
                </div>
              </fieldset>
            </div>
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
            {errors?.terms && <ErrorMessage message={errors.terms} />}
            <div className={styles.buttonContainer}>
              <Button
                className={styles.signUpButton}
                type="submit"
                onClick={handleSignUp}
              >
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
