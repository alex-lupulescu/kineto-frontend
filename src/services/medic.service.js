// src/services/medic.service.js
import ApiService from './api.service';

export default {
  getMedicDashboardStats() {
    return ApiService.get('/medic/dashboard/stats');
  },

  getAppointmentsByDate(date) {
    return ApiService.get('/medic/calendar', { date });
  },

  getAllAppointments() {
    return ApiService.get('/medic/appointments');
  },

  createAppointment(data) {
    return ApiService.post('/medic/appointment', data);
  },

  completeAppointment(appointmentId, notes) {
    return ApiService.put(`/medic/appointment/${appointmentId}/complete?notes=${notes || ''}`);
  },

  inviteUserToJoin(data) {
    return ApiService.post('/medic/invite', data);
  },

  // Patients
  searchUsers(query) {
    return ApiService.get('/medic/user/search', { query });
  },

  getUserProfile(userId) {
    return ApiService.get(`/medic/user/${userId}`);
  },

  getUserPackages(userId) {
    return ApiService.get(`/medic/user/${userId}/packages`);
  },

  getMyPatients() {
    return ApiService.get('/medic/patients');
  },

  assignPackageToUser(data) {
    return ApiService.post('/medic/package/assign', data);
  },

  addSessionsToPackage(packageId, additionalSessions) {
    return ApiService.post(`/medic/package/${packageId}/add-sessions?additionalSessions=${additionalSessions}`);
  }
};
