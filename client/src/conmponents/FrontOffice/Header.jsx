import React, { useState } from "react";
import styles from "./Header.module.css";
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";

const Header = () => {

    const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggle from ThemeContext


    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1>My Front Office</h1>
            </div>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <a href="#home" className={styles.navLink}>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#about" className={styles.navLink}>
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#services" className={styles.navLink}>
                            Services
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className={styles.navLink}>
                            Contact
                        </a>
                    </li>
                </ul>
            </nav>
            <div className={styles.themeToggle}>
                <button onClick={toggleTheme} className={styles.toggleButton}>
                    {theme === "dark" ? "🌙" : "🌞"}{" "}
                    {/* Icon for dark/light mode */}
                </button>
            </div>
        </header>
    );
};

export default Header;
