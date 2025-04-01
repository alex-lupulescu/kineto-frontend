import api from '@/services/api';

export default {
  /**
   * Get all medics with optional filtering
   */
  getAllMedics(params = {}) {
    return api.get('/medics', { params });
  },
  
  /**
   * Get a specific medic by ID
   */
  getMedic(id) {
    return api.get(`/medics/${id}`);
  },
  
  /**
   * Update a medic's status (active/inactive)
   */
  updateStatus(id, active) {
    return api.patch(`/medics/${id}/status`, { active });
  },
  
  /**
   * Send an invitation to a new medic
   */
  sendInvitation(medicData) {
    return api.post('/medics/invitations', medicData);
  },
  
  /**
   * Get a medic's activity log
   */
  getMedicActivity(id, params = {}) {
    return api.get(`/medics/${id}/activity`, { params });
  }
};