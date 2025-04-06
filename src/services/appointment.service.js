// src/services/appointment.service.js
import ApiService from './api.service';

const AppointmentService = {
  // This method calls the backend endpoint to get the medic's availability
  getMedicAvailability(medicId, date) {
    // Assuming your backend endpoint is something like /medic/{medicId}/availability?date=YYYY-MM-DD
    return ApiService.get(`/user/medic/${medicId}/availability?date=${date}`);
  },

  // Other appointment-related methods can be added here, for example:
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

export default AppointmentService;
