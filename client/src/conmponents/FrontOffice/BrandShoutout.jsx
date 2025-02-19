import React, { useState } from "react";
import styles from "./BrandShoutout.module.css";

const BrandShoutout = ({ position, hideBottom }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleHide = () => {
    setIsVisible(false);
  };

  // If it's the bottom shoutout and you want to hide it via code, return null
  if (position === "bottom" && hideBottom) return null;

  // If it's the top shoutout and the user hides it, return null
  if (position === "top" && !isVisible) return null;

  return (
    <div className={`${styles.brandShoutout} ${position === "top" ? styles.top : styles.bottom}`}>
      <p>
        Made by <span className={styles.agencyName}>CVitaeDesigns</span>
      </p>
      <a href="/create-portfolio" className={styles.createLink}>
        Create your own portfolio page!
      </a>

      {position === "top" && (
        <button className={styles.hideButton} onClick={handleHide}>
          ✕
        </button>
      )}
    </div>
  );
};

export default BrandShoutout;
