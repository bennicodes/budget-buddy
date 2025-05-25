import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import Button from "../../components/Button/Button";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Modal from "../../components/Modal/Modal";
import { database } from "../../firebaseConfig";
import useContactValidation from "../../hooks/useContactValidation";
import styles from "./Contact.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
  });
  const [showContactModal, setShowContactModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { contactErrors, validateContact, validateMessageLength } =
    useContactValidation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "message") {
      validateMessageLength(value, 300);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateContact(formData);
    if (!isValid) {
      console.log("Form is invalid, please check the errors");

      return;
    }

    try {
      const docRef = await addDoc(collection(database, "contactMessages"), {
        ...formData,
        submittedAt: serverTimestamp(),
      });
      setShowContactModal(true);

      // Clear form
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log("Error adding document:", error);
      setErrorMessage("Failed to send your message. Please try again later.");
    }
  };
  return (
    <div className={styles.contactWrapper}>
      <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend className={styles.formTitle}>Contact Us</legend>
          <p className={styles.description}>
            We would love to hear from you! If you have any questions or
            feedback, feel free to reach out to us!
          </p>

          <div className={styles.formGroup}>
            <label htmlFor="firstname">First name:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
            />
          </div>
          <ErrorMessage
            message={contactErrors.firstname}
            className={styles.errorMessage}
          />
          <div className={styles.formGroup}>
            <label htmlFor="lastname">Last name:</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
            />
          </div>
          <ErrorMessage
            message={contactErrors.lastname}
            className={styles.errorMessage}
          />
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <ErrorMessage
            message={contactErrors.email}
            className={styles.errorMessage}
          />
          <div className={styles.formGroup}>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              className={styles.messageBox}
              maxLength={300}
              rows={5}
              cols={30}
              placeholder="Enter your message (max 300 characters)"
              value={formData.message}
              onChange={handleInputChange}
            ></textarea>
            <div className={styles.messageCountAndErrors}>
              <span
                className={
                  formData.message.length >= 300
                    ? styles.messageCountError
                    : styles.messageCount
                }
              >
                Typed characters {formData.message.length}/300
              </span>
              <ErrorMessage
                message={contactErrors.message}
                className={styles.errorMessage}
              />
            </div>
            <ErrorMessage
              message={errorMessage}
              className={errorMessage ? styles.submitErrorMessage : ""}
            />
          </div>

          <Button type="submit" className={styles.submitButton}>
            Send
          </Button>
        </fieldset>
      </form>
      {showContactModal && (
        <Modal isOpen={showContactModal}>
          <div className={styles.contactModalContent}>
            <h2>Your message has been delivered!</h2>
            <p>
              Thank you for reaching out! We’ve received your message and will
              get back to you as soon as possible.
            </p>
            <p>
              We appreciate your patience and look forward to assisting you.
            </p>
            <Button onClick={() => setShowContactModal(false)}>Close</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Contact;
