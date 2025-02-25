import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Sun, Moon } from 'lucide-react';
import ThemeContext from '../../context/ThemeContext';
import styles from './Header.module.css';
import AuthContext from '../../context/AuthContext';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);

  return (
    <header className={`${styles.header} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <div className={styles.logo}>
        <h1>
          <Link to="/dashboard" className={styles.logoLink}>Backoffice</Link>
        </h1>
      </div>
      {/* <nav className={styles.navList}>
        <ul>
          <li><Link to="/dashboard" className={styles.navItem}>Dashboard</Link></li>
          <li><Link to="/projects" className={styles.navItem}>Projects</Link></li>
        </ul>
      </nav> */}
      <div className={styles.actions}>
        <button onClick={toggleTheme} className={styles.toggleButton} aria-label="Toggle Theme">
          {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button onClick={logout} className={styles.logoutButton} aria-label="Logout">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
