// src/services/auth.service.js
import ApiService from './api.service';

export default {
  login(credentials) {
    return ApiService.post('/auth/login', credentials);
  },

  register(userData) {
    return ApiService.post('/auth/signup', userData);
  },

  registerWithInvitation(userData, token) {
    return ApiService.post(`/auth/signup/invitation/${token}`, userData);
  },

  registerMedicWithInvitation(medicData, token) {
    return ApiService.post(`/auth/signup/medic/invitation/${token}`, medicData);
  },

  getCurrentUserProfile() {
    return ApiService.get('/user/profile');
  }
};

