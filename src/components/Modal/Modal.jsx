import styles from "./Modal.module.css";

const Modal = ({
  isOpen,
  closeModal,
  children,
  overlayClassName = "",
  contentClassName = "",
}) => {
  if (!isOpen) return null;
  const renderModal = isOpen ? { display: "flex" } : { display: "none" };

  return (
    <div
      className={`${styles.modalOverlay} ${overlayClassName}`}
      style={renderModal}
      onClick={closeModal}
    >
      <div
        className={`${styles.modalContent} ${contentClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
