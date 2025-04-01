// src/services/admin.service.js
import ApiService from './api.service';

export default {
  getAllMedics() {
    return ApiService.get('/admin/medics');
  },

  getMedicDetails(medicId) {
    return ApiService.get(`/admin/medic/${medicId}`);
  },

  createMedic(medicData) {
    return ApiService.post('/admin/medic', medicData);
  },

  updateMedicStatus(userId, status) {
    // status might be 'ACTIVE' or 'SUSPENDED'
    return ApiService.put('/admin/medic/status', { userId, status });
  },

  getMedicAppointments(medicId) {
    return ApiService.get(`/admin/medic/${medicId}/appointments`);
  },

  // Package endpoints
  getAllPackages() {
    return ApiService.get('/admin/packages');
  },

  createPackage(pkg) {
    return ApiService.post('/admin/package', pkg);
  },

  updatePackage(packageId, pkg) {
    return ApiService.put(`/admin/package/${packageId}`, pkg);
  },

  togglePackageStatus(packageId) {
    return ApiService.put(`/admin/package/${packageId}/status`);
  }
};
