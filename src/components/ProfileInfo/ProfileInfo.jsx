import { sendEmailVerification } from "firebase/auth";
import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFetchUserData } from "../../hooks/useFetchUser";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import styles from "./ProfileInfo.module.css";

const ProfileInfo = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await useFetchUserData();
        setUserData(data);
        console.log("User data fetched successfully:", data);
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
    try {
      await sendEmailVerification(user);
      setIsOpen(true);
      setMessage(
        "Verification email sent successfully! Please check your inbox."
      );
    } catch (error) {
      console.error("Error sending verification email:", error);
      setMessage("Failed to send verification email. Please try again later.");
    }
  };

  return (
    <div className={styles.profileInfoWrapper}>
      <fieldset>
        <legend className={styles.profileTitle}>Profile Info</legend>

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
            {userData?.emailVerified ? "Verified ✅" : "Not Verified ❌"}
          </p>
          {!userData?.emailVerified && (
            <Button
              className={styles.verifyButton}
              onClick={handleSendVerification}
            >
              Send Verification
            </Button>
          )}
        </div>
        <div className={styles.infoGroup}>
          <label className={styles.label}>Last login:</label>
          <p className={styles.lastLogin}>{userData?.lastLogin}</p>
        </div>
      </fieldset>
      <Modal>email verification sent!</Modal>
    </div>
  );
};

export default ProfileInfo;
