// services/authService.js
import api from "./apiService";

export const loginUser = (credentials) => {
    try {
        return api.post("/users/login", credentials);
    } catch (err) {
        console.error("Error during login:", err);
        setError(
            err.response?.data?.message ||
                "An error occurred. Please try again."
        );
    }
};

export const registerUser = (userData) => {
    return api.post("/users/register", userData);
};

export const logoutUser = () => {
    // You might want to clear out stored tokens here
    localStorage.removeItem("token");
};
