// services/userService.js
import api from './apiService';

// Fetch current user data
export const getUserData = () => {
  return api.get('/users/me');
};

// Update current user profile
export const updateUser = (userData) => {
  return api.put('/users/me', userData);
};

// Fetch all users (Admin use case)
export const getAllUsers = () => {
  return api.get('/users');
};

// Fetch a single user by ID
export const getUserById = (userId) => {
  return api.get(`/users/${userId}`);
};

// Delete a user (Admin use case)
export const deleteUser = (userId) => {
  return api.delete(`/users/${userId}`);
};

// Update user role (Admin use case)
export const updateUserRole = (userId, role) => {
  return api.put(`/users/${userId}/role`, { role });
};

// Get projects related to a specific user
export const getUserProjects = (userId) => {
  return api.get(`/users/${userId}/projects`);
};