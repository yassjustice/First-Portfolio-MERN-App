// services/userService.js
import api from './apiService';

export const getUserData = () => {
  return api.get('/users/me'); // Get current user info
};

export const updateUser = (userData) => {
  return api.put('/users/me', userData); // Update user info
};
