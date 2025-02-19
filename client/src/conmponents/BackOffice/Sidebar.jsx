import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';
import ThemeContext from '../../context/ThemeContext';
import { useContext } from 'react';

const Sidebar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggle from ThemeContext

  return (
    <div className={`${styles.sidebar} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <div className={styles.logo}>
        {/* You can replace this with your app's logo */}
        <h2>My App</h2>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/dashboard" className={styles.navItem}>Dashboard</Link>
          </li>
          <li>
            <Link to="/projects" className={styles.navItem}>Projects</Link>
          </li>
          <li>
            <Link to="/users" className={styles.navItem}>Users</Link>
          </li>
          <li>
            <Link to="/settings" className={styles.navItem}>Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
