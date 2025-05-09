import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ message, errorLogo, className = "" }) => {
  return (
    <div className={styles.errorContainer}>
      <span>{errorLogo}</span>
      <p className={`${styles.errorText} ${className}`}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
