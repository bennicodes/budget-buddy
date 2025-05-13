import styles from "./Spinner.module.css";

const Spinner = ({ wrapperClassName, spinnerClassName }) => {
  return (
    <div className={`${styles.spinnerWrapper} ${wrapperClassName}`}>
      <div className={`${styles.spinnerCircle} ${spinnerClassName}`}></div>
    </div>
  );
};

export default Spinner;
