import React from 'react';
import styles from './Card.module.css';

const Card = ({ title, description, children }) => {
  return (
    <div className={styles.card}>
      {title && <h3 className={styles.cardTitle}>{title}</h3>}
      {description && <p className={styles.cardDescription}>{description}</p>}
      {children}
    </div>
  );
};

export default Card;
