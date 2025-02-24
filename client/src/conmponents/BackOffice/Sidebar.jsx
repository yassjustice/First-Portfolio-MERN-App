import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';
import ThemeContext from '../../context/ThemeContext';
import { useContext } from 'react';

const Sidebar = () => {
  const { theme } = useContext(ThemeContext); // Access theme from ThemeContext
  const location = useLocation(); // Get current route

  return (
    <div className={`${styles.sidebar} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <div className={styles.logo}>
        <h2>My App</h2>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/backoffice/dashboard" 
              className={`${styles.navItem} ${location.pathname === "/backoffice/dashboard" ? styles.active : ""}`}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/backoffice/projects" 
              className={`${styles.navItem} ${location.pathname === "/backoffice/projects" ? styles.active : ""}`}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="/backoffice/users" 
              className={`${styles.navItem} ${location.pathname === "/backoffice/users" ? styles.active : ""}`}>
              Users
            </Link>
          </li>
          <li>
            <Link to="/backoffice/settings" 
              className={`${styles.navItem} ${location.pathname === "/backoffice/settings" ? styles.active : ""}`}>
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
