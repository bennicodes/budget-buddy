import { sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
import { getAuthInstance } from "../../firebaseConfig";
import { useFetchUserData } from "../../hooks/useFetchUser";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Spinner from "../Spinner/Spinner";
import styles from "./ProfileInfo.module.css";

const ProfileInfo = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSendingVerification, setIsSendingVerification] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await useFetchUserData();
        setUserData(data);
      } catch (error) {
        console.log("Error fetching user data:", error);
        setError("Failed to fetch user data.");
      } finally {
        setIsLoading(false);
      }
    };
    getUserData();
  }, []);

  const handleSendVerification = async () => {
    const auth = getAuthInstance();
    const user = auth.currentUser;
    if (!user) return;

    setIsSendingVerification(true);
    setIsOpen(true);

    try {
      await sendEmailVerification(user);
      setMessage(
        "Verification email sent successfully! Please check your inbox."
      );
    } catch (error) {
      console.error("Error sending verification email:", error);
      setMessage("Failed to send verification email. Please try again later.");
    } finally {
      setIsSendingVerification(false);
      setTimeout(() => {
        setIsOpen(false);
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className={styles.profileInfoWrapper}>
      {isLoading ? (
        <Spinner wrapperClassName={styles.spinnerWrapper} />
      ) : (
        <>
          <fieldset>
            <legend className={styles.profileTitle}>Profile Info</legend>
            {error ? (
              <p className={styles.errorMessage}>{error}</p>
            ) : (
              <>
                <div className={styles.infoGroup}>
                  <label className={styles.label}>First Name:</label>
                  <p>{userData?.firstname}</p>
                </div>
                <div className={styles.infoGroup}>
                  <label className={styles.label}>Last Name:</label>
                  <p>{userData?.lastname}</p>
                </div>

                <div className={styles.infoGroup}>
                  <label className={styles.label}>Email:</label>
                  <p>{userData?.email}</p>
                </div>

                <div className={styles.infoGroup}>
                  <label className={styles.label}>Verification Status:</label>
                  <p className={styles.verificationStatus}>
                    {userData?.emailVerified
                      ? "Verified ✅"
                      : "Not Verified ❌"}
                  </p>
                  {!userData?.emailVerified && (
                    <Button
                      className={styles.verifyButton}
                      onClick={handleSendVerification}
                      aria-label="Send email verification"
                    >
                      Send Verification
                    </Button>
                  )}
                </div>

                <div className={styles.infoGroup}>
                  <label className={styles.label}>Last login:</label>
                  <p className={styles.lastLogin}>{userData?.lastLogin}</p>
                </div>
              </>
            )}
          </fieldset>
          <Modal isOpen={isOpen} contentClassName={styles.verifyModalContent}>
            {isSendingVerification ? (
              <Spinner spinnerClassName={styles.spinner} />
            ) : (
              <p className={styles.verifyMessage}>{message}</p>
            )}
            <Button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </Modal>
        </>
      )}
    </div>
  );
};

export default ProfileInfo;
