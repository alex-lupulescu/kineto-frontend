// src/services/schedule.service.js
import ApiService from './api.service';

export default {
  setWorkingHours(dayOfWeek, startTime, endTime) {
    // We send query parameters here; alternatively, you can send a JSON body.
    return ApiService.post(`/medic/schedule/working-hours?day=${dayOfWeek}&startTime=${startTime}&endTime=${endTime}`);
  },
  getWorkingHours() {
    return ApiService.get('/medic/schedule/working-hours');
  },
  blockTime(blockedSlot) {
    return ApiService.post('/medic/schedule/block', blockedSlot);
  },
  getBlockedSlots() {
    return ApiService.get('/medic/schedule/blocks');
  }
};
