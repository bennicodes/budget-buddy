import Button from "../../components/Button/Button";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <div className={styles.contactWrapper}>
      <form className={styles.contactForm} noValidate>
        <fieldset>
          <legend className={styles.formTitle}>Contact Us</legend>
          <p className={styles.description}>
            We would love to hear from you! If you have any questions or
            feedback, feel free to reach out to us!
          </p>

          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              className={styles.messageBox}
              maxLength={300}
              onResize={"none"}
              placeholder="Write your message here. Max 500 characters"
            ></textarea>
          </div>
          <Button type="submit" className={styles.submitButton}>Send</Button>
        </fieldset>
      </form>
    </div>
  );
};

export default Contact;
