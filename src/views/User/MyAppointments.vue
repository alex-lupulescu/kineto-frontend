<template>
    <div class="my-appointments-page">
      <h1>My Appointments</h1>
  
      <div v-if="userLoading">Loading...</div>
      <div v-else>
        <div v-if="userError" class="error">{{ userError }}</div>
        <div v-if="filteredAppointments.length === 0">
          No appointments found.
        </div>
        <div v-else>
          <div v-for="appt in filteredAppointments" :key="appt.id">
            <p>{{ appt.medicName }} - {{ formatDateTime(appt.startTime) }}</p>
            <button @click="cancelAppt(appt)">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MyAppointments',
    data() {
      return {
        filter: 'upcoming' // for example
      };
    },
    computed: {
      userLoading() {
        return this.$store.state.user.loading;
      },
      userError() {
        return this.$store.state.user.error;
      },
      allAppointments() {
        return this.$store.state.user.appointments;
      },
      filteredAppointments() {
        // Just an example of using local filter
        if (this.filter === 'upcoming') {
          return this.allAppointments.filter(appt => new Date(appt.startTime) > new Date());
        }
        return this.allAppointments;
      }
    },
    created() {
      // fetch user appointments
      this.$store.dispatch('user/fetchUserAppointments');
    },
    methods: {
      formatDateTime(dt) {
        return new Date(dt).toLocaleString();
      },
      async cancelAppt(appt) {
        try {
          // example payload
          await this.$store.dispatch('user/cancelAppointment', {
            appointmentId: appt.id
          });
          // re-fetch appointments
          this.$store.dispatch('user/fetchUserAppointments');
        } catch (error) {
          console.error('Failed to cancel appointment', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .my-appointments-page {
    height: 100%;
  }
  
  .page-title {
    font-size: 1.75rem;
    color: #2d3748;
    margin-bottom: 1.5rem;
  }
  
  .appointments-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
  }
  
  /* Filter Section */
  .filter-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .search-bar {
    position: relative;
    flex: 1;
    max-width: 400px;
  }
  
  .search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #a0aec0;
  }
  
  .search-input {
    width: 100%;
    padding: 0.75rem 0.75rem 0.75rem 2.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    font-size: 0.875rem;
  }
  
  .filter-buttons {
    display: flex;
    gap: 0.5rem;
  }
  
  .filter-button {
    padding: 0.5rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    background-color: white;
    color: #4a5568;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .filter-button:hover {
    background-color: #f7fafc;
  }
  
  .filter-button.active {
    background-color: #3182ce;
    color: white;
    border-color: #3182ce;
  }
  
  /* Loading State */
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 0;
    color: #a0aec0;
  }
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e2e8f0;
    border-top-color: #3182ce;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  /* Empty State */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 0;
    color: #a0aec0;
  }
  
  .empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .empty-title {
    font-size: 1.25rem;
    color: #4a5568;
    margin-bottom: 0.5rem;
  }
  
  .empty-message {
    text-align: center;
    max-width: 400px;
    margin-bottom: 1.5rem;
  }
  
  .book-button {
    display: flex;
    align-items: center;
    background-color: #3182ce;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    text-decoration: none;
  }
  
  .book-button:hover {
    background-color: #2c5282;
  }
  
  .book-button i {
    margin-right: 0.5rem;
  }
  
  /* Appointments List */
  .appointments-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .appointment-card {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .appointment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #f7fafc;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .appointment-date {
    display: flex;
    align-items: center;
  }
  
  .date-circle {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    border: 1px solid #e2e8f0;
    margin-right: 0.75rem;
  }
  
  .month {
    font-size: 0.75rem;
    color: #4a5568;
    text-transform: uppercase;
  }
  
  .day {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
  }
  
  .time {
    font-size: 0.875rem;
    color: #4a5568;
  }
  
  .appointment-status {
    display: flex;
    align-items: center;
  }
  
  .status-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .status-badge.status-scheduled {
    background-color: #ebf8ff;
    color: #3182ce;
  }
  
  .status-badge.status-completed {
    background-color: #c6f6d5;
    color: #38a169;
  }
  
  .status-badge.status-cancelled {
    background-color: #fed7d7;
    color: #e53e3e;
  }
  
  .appointment-body {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .medic-info {
    flex: 1;
  }
  
  .medic-name {
    margin: 0 0 0.25rem 0;
    font-size: 1.125rem;
    color: #2d3748;
  }
  
  .appointment-type,
  .appointment-location {
    margin: 0.25rem 0 0 0;
    font-size: 0.875rem;
    color: #718096;
  }
  
  .appointment-location i {
    margin-right: 0.25rem;
  }
  
  .appointment-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  
  .action-button {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }
  
  .action-button i {
    margin-right: 0.25rem;
  }
  
  .action-button.reschedule {
    background-color: #ebf8ff;
    color: #3182ce;
  }
  
  .action-button.reschedule:hover {
    background-color: #bee3f8;
  }
  
  .action-button.cancel {
    background-color: #fed7d7;
    color: #e53e3e;
  }
  
  .action-button.cancel:hover {
    background-color: #feb2b2;
  }
  
  .action-button.details {
    background-color: #f7fafc;
    color: #4a5568;
    border: 1px solid #e2e8f0;
  }
  
  .action-button.details:hover {
    background-color: #edf2f7;
  }
  
  /* Pagination */
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;
  }
  
  .pagination-button {
    background-color: #f7fafc;
    border: 1px solid #e2e8f0;
    color: #4a5568;
    width: 36px;
    height: 36px;
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .pagination-button:hover:not(:disabled) {
    background-color: #edf2f7;
  }
  
  .pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .pagination-info {
    margin: 0 1rem;
    font-size: 0.875rem;
    color: #4a5568;
  }
  
  /* Modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
  }
  
  .modal-container {
    background-color: white;
    border-radius: 8px;
    width: 500px;
    max-width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .modal-header h3 {
    margin: 0;
    font-size: 1.25rem;
    color: #2d3748;
  }
  
  .close-button {
    background-color: transparent;
    border: none;
    color: #a0aec0;
    cursor: pointer;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }
  
  .close-button:hover {
    color: #4a5568;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
  
  .modal-message {
    margin-bottom: 1.5rem;
    color: #4a5568;
  }
  
  /* Date selection in modal */
  .date-selection {
    margin-bottom: 1.5rem;
  }
  
  .date-selection h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1rem;
    color: #2d3748;
  }
  
  .calendar-grid.small {
    grid-template-columns: repeat(7, 1fr);
    gap: 0.25rem;
    margin-bottom: 1.5rem;
  }
  
  .calendar-grid.small .calendar-day {
    aspect-ratio: 1;
    font-size: 0.875rem;
    padding: 0.25rem;
  }
  
  .time-slots-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 0.5rem;
  }
  
  /* Cancellation reason */
  .cancellation-reason {
    margin-bottom: 1.5rem;
  }
  
  .cancellation-reason label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a5568;
    font-weight: 500;
  }
  
  .cancellation-reason textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-size: 0.875rem;
    resize: vertical;
  }
  
  /* Modal actions */
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
  
  .modal-actions.centered {
    justify-content: center;
  }
  
  .back-button,
  .cancel-button,
  .confirm-button,
  .delete-button,
  .close-details-button {
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .back-button,
  .cancel-button {
    background-color: transparent;
    color: #4a5568;
    border: 1px solid #e2e8f0;
  }
  
  .back-button:hover,
  .cancel-button:hover {
    background-color: #f7fafc;
  }
  
  .confirm-button {
    background-color: #3182ce;
    color: white;
    border: none;
  }
  
  .confirm-button:hover:not(:disabled) {
    background-color: #2c5282;
  }
  
  .confirm-button:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
  
  .delete-button {
    background-color: #e53e3e;
    color: white;
    border: none;
  }
  
  .delete-button:hover:not(:disabled) {
    background-color: #c53030;
  }
  
  .delete-button:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
  
  .close-details-button {
    background-color: #3182ce;
    color: white;
    border: none;
  }
  
  .close-details-button:hover {
    background-color: #2c5282;
  }
  
  /* Appointment details */
  .appointment-details {
    margin-bottom: 1.5rem;
  }
  
  .detail-row {
    display: flex;
    margin-bottom: 0.75rem;
  }
  
  .detail-label {
    width: 120px;
    color: #718096;
    font-weight: 500;
  }
  
  .detail-value {
    flex: 1;
    color: #2d3748;
  }
  </style>