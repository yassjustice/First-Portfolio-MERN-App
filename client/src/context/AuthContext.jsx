import React, { createContext, useState, useEffect } from "react";
import { getUserData } from "../services/userService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true); // Track loading state
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            fetchUser();
        } else {
            setLoading(false); // If no token, stop loading
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            console.log("🔹 Fetching user with token:", token);
            const data = await getUserData(token); // Ensure the token is passed
            console.log("🔹 User data fetched:", data);
            setUser(data);
        } catch (error) {
            console.error("Error fetching user:", error);
            logout();
        } finally {
            setLoading(false); // Ensure loading state is updated
        }
    };

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem("token", authToken);
        navigate("/backoffice/dashboard");
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        navigate("/loginpage");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {!loading && children} {/* Prevent rendering children until loading is complete */}
        </AuthContext.Provider>
    );
};

export default AuthContext;
