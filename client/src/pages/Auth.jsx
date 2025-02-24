import React, { useState, useContext } from "react";
import styles from "./Auth.module.css";
import AuthContext from "../context/AuthContext";
import { loginUser, registerUser } from "../services/authService";

const Auth = () => {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ username: "", email: "", password: "" });
    setError(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isLogin) {
        const response = await loginUser({ email: formData.email, password: formData.password });
        login(response.data.user, response.data.token); // Ensure this uses the updated response
        console.log("🔹 Response from API:", response);
        console.log("🔹 Sending to API:", formData);
      } else {
        await registerUser({ username: formData.username, email: formData.email, password: formData.password });
        toggleMode();
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };
  

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <h2 className={styles.title}>{isLogin ? "Login" : "Sign Up"}</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.authForm} onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="User Name"
              className={styles.input}
              value={formData.username}
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles.input}
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className={styles.submitButton}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className={styles.toggleText} onClick={toggleMode}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Auth;
