import React from "react";
import styles from "./Button.module.css";

const Button = ({ onClick, className, children, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
