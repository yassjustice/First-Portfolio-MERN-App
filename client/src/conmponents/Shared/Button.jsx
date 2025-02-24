import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
