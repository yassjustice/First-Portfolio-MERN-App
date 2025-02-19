import React from 'react';
import styles from './Button.module.css';

const Button = ({ label, onClick, type = 'button', className = '' }) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
