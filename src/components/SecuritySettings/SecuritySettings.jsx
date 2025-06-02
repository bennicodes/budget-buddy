import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useChangePasswordValidation from "../../hooks/useChangePasswordValidation";
import Button from "../Button/Button";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../Spinner/Spinner";
import styles from "./SecuritySettings.module.css";

const SecuritySettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");

  // Auth hook
  const { user, changePassword } = useAuth();
  // Validation hook
  const { validate, passwordErrors } = useChangePasswordValidation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword") setCurrentPassword(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setSuccess("");
    setErrors({});
    if (
      !currentPassword.trim() ||
      !newPassword.trim() ||
      !confirmPassword.trim()
    ) {
      setErrors({ general: "Please fill in the fields" });
      return;
    }

    const isValid = validate({
      currentPassword,
      newPassword,
      confirmPassword,
      user,
    });

    if (!isValid) return;

    try {
      setIsLoading(true);
      await changePassword(currentPassword, newPassword);
      setSuccess("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
    } catch (error) {
      setErrors({ currentPassword: error.message });
      setErrors({
        general: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className={styles.securityWrapper}>
      <fieldset>
        <legend className={styles.changePasswordTitle}>Change Password</legend>
        <form
          className={styles.changePasswordForm}
          onSubmit={handleChangePassword}
          noValidate
        >
          <div className={styles.inputGroup}>
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
              value={currentPassword}
              onChange={handleChange}
            />
            {passwordErrors.currentPassword && (
              <ErrorMessage
                className={styles.passwordError}
                message={passwordErrors.currentPassword}
              />
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={newPassword}
              onChange={handleChange}
            />
            {passwordErrors.newPassword && (
              <ErrorMessage
                className={styles.passwordError}
                message={passwordErrors.newPassword}
              />
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
            {passwordErrors.confirmPassword && (
              <ErrorMessage
                className={styles.passwordError}
                message={passwordErrors.confirmPassword}
              />
            )}
          </div>
          {/* ----------------------- */}
          {passwordErrors.general && (
            <ErrorMessage
              className={styles.errorText}
              message={passwordErrors.general}
            />
          )}

          {errors.general && (
            <ErrorMessage
              className={styles.errorText}
              message={errors.general}
            />
          )}
          {/* -------------------- */}
          {success && <p className={styles.successMessage}>{success}</p>}

          <div className={styles.buttonContainer}>
            <Button
              className={styles.changePasswordButton}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner spinnerClassName={styles.spinner} />
              ) : (
                "Change Password"
              )}
            </Button>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default SecuritySettings;
