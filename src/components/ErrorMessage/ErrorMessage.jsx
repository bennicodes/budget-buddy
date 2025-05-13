import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ message, className = "" }) => {
  return (
    <div className={styles.errorContainer}>
      <p className={`${styles.errorText} ${className}`}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
