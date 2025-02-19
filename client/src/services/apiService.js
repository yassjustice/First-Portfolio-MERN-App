import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://fallback-api-url.com", // Fallback URL if env variable is not set
    headers: {
        "Content-Type": "application/json",
    },
});

// Intercept requests to add token to Authorization header
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Or use Context to store token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
