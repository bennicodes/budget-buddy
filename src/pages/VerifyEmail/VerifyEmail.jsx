import { sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { auth } from "../../firebaseConfig";
import styles from "./VerifyEmail.module.css";

const VerifyEmail = () => {
  // useState variables
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkVerificationStatus = async () => {
      await auth.currentUser.reload();
      setEmailVerified(auth.currentUser.emailVerified);

      if (auth.currentUser.emailVerified) {
        navigate("/");
      }
    };
    const interval = setInterval(checkVerificationStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleResendVerification = async () => {
    setError(null);
    try {
      await sendEmailVerification(auth.currentUser);
      setEmailSent(true);
    } catch (error) {
      setError("Failed to resend verification email. Please try again later.");
    }
  };

  return (
    <div className={styles.verifyWrapper}>
      {emailVerified ? (
        <h1>Email verified. Redirecting to the main page</h1>
      ) : (
        <div className={styles.verificationContainer}>
          <h2>Check your inbox and verify your email.</h2>
          <p>
            If you havent recieved the email, click in the link below to request
            another verification email
          </p>
          <div className={styles.bottomContainer}>
            <Button
              className={styles.resendButton}
              onClick={handleResendVerification}
            >
              Resend verification email
            </Button>
            {emailSent && (
              <p>
                A new email verification has been sent. Please check your inbox
              </p>
            )}
            {error && (
              <ErrorMessage className={styles.verifyErrorMessage}>
                {error}
              </ErrorMessage>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
