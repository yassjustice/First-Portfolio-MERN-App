import React from "react";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Crafting Digital Excellence</h1>
        <p className={styles.subtitle}>
          Elevate your presence with a stunning, personalized portfolio.
        </p>
        <a href="/create-portfolio" className={styles.ctaButton}>
          Get Started
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
