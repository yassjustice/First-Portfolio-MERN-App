import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import ThemeContext from '../../context/ThemeContext';
import { useContext } from 'react';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggle from ThemeContext


  return (
    <header className={`${styles.header} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <div className={styles.logo}>
        <h1>
          <Link to="/" className={styles.logoLink}>My App</Link>
        </h1>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li><Link to="/about" className={styles.navItem}>About</Link></li>
          <li><Link to="/contact" className={styles.navItem}>Contact</Link></li>
          {/* Add more navigation items as needed */}
        </ul>
      </nav>
      <div className={styles.themeToggle}>
        <button onClick={toggleTheme} className={styles.toggleButton}>
          {theme === 'dark' ? '🌙' : '🌞'} {/* Icon for dark/light mode */}
        </button>
      </div>
    </header>
  );
};

export default Header;
