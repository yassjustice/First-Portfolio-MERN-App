import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">MyPortfolio</Link>
      </div>
      <ul className={styles.navLinks}>
        <li><Link to="/" className={styles.navItem}>Home</Link></li>
        <li><Link to="/about" className={styles.navItem}>About</Link></li>
        <li><Link to="/contact" className={styles.navItem}>Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
