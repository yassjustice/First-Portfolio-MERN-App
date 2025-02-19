// services/projectService.js
import api from './apiService';

export const getProjects = () => {
  return api.get('/projects');
};

export const createProject = (projectData) => {
  return api.post('/projects', projectData);
};
