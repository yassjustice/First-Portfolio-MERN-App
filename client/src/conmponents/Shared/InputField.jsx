import React from 'react';
import styles from './InputField.module.css';

const InputField = ({ label, type = 'text', value, onChange, placeholder, required = false }) => {
  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={styles.input}
      />
    </div>
  );
};

export default InputField;
