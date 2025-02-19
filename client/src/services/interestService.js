// services/interestService.js
import api from './apiService';

export const getInterests = () => {
  return api.get('/interest');
};

export const updateInterests = (interestData) => {
  return api.put('/interest', interestData);
};
