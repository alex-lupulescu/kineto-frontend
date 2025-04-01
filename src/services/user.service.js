// src/services/user.service.js
import ApiService from './api.service';

export default {
  getUserProfile() {
    return ApiService.get('/user/profile');
  },

  updateProfile(data) {
    return ApiService.put('/user/profile', data);
  },

  changePassword(oldPassword, newPassword) {
    return ApiService.put(`/user/password?oldPassword=${oldPassword}&newPassword=${newPassword}`);
  },

  getUserAppointments() {
    return ApiService.get('/user/appointments');
  },

  getUserPackages() {
    return ApiService.get('/user/packages');
  },

  scheduleAppointment(data) {
    return ApiService.post('/user/appointment', data);
  },

  rescheduleAppointment(data) {
    return ApiService.put('/user/appointment/reschedule', data);
  },

  cancelAppointment(data) {
    return ApiService.put('/user/appointment/cancel', data);
  }
};
