// services/authService.js
import api from './apiService';

export const loginUser = (credentials) => {
  return api.post('/auth/login', credentials);
};

export const registerUser = (userData) => {
  return api.post('/auth/register', userData);
};

export const logoutUser = () => {
  // You might want to clear out stored tokens here
  localStorage.removeItem('token');
};
