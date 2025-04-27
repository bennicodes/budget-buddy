import styles from "./Modal.module.css";

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;
  const renderModal = isOpen ? { display: "flex" } : { display: "none" };

  return (
    <div
      className={styles.modalOverlay}
      style={renderModal}
      onClick={closeModal}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
