import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Page Not Found</h2>
      <p className={styles.description}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" className={styles.homeButton}>Go Back Home</Link>
    </div>
  );
};

export default NotFound;