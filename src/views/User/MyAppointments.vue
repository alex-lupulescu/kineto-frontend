<template>
    <AuthenticatedLayout>
      <div class="my-appointments-page">
        <h1 class="page-title">My Appointments</h1>
        
        <!-- Loading state -->
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Loading your appointments...</p>
        </div>
        
        <!-- Error state -->
        <div v-else-if="error" class="error">
          {{ error }}
        </div>
        
        <!-- No appointments -->
        <div v-else-if="filteredAppointments.length === 0" class="empty-state">
          <p>No appointments found.</p>
          <router-link to="/user/book" class="book-button">
            <i class="fas fa-plus"></i> Book an Appointment
          </router-link>
        </div>
        
        <!-- Appointments list -->
        <div v-else class="appointments-list">
          <div v-for="appt in filteredAppointments" :key="appt.id" class="appointment-card">
            <div class="appointment-info">
              <p class="medic-name">{{ appt.medicName }}</p>
              <p class="appointment-datetime">{{ formatDateTime(appt.startTime) }}</p>
            </div>
            <button @click="cancelAppt(appt)" class="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  </template>
  
  <script>
  import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
  
  export default {
    name: 'MyAppointments',
    components: { AuthenticatedLayout },
    data() {
      return {
        // Local filter state; can be extended for more filter options
        filter: 'upcoming'
      };
    },
    computed: {
      // Explicitly returning state from the Vuex store
      loading() {
        return this.$store.state.user.loading;
      },
      error() {
        return this.$store.state.user.error;
      },
      appointments() {
        return this.$store.state.user.appointments;
      },
      filteredAppointments() {
        // Example filter: only show upcoming appointments
        if (this.filter === 'upcoming') {
          return this.appointments.filter(
            (appt) => new Date(appt.startTime) > new Date()
          );
        } else if (this.filter === 'past') {
          return this.appointments.filter(
            (appt) => new Date(appt.startTime) <= new Date()
          );
        }
        return this.appointments;
      }
    },
    created() {
      // When the component is created, dispatch the action to fetch appointments
      this.$store.dispatch('user/fetchUserAppointments');
    },
    methods: {
      formatDateTime(dt) {
        return new Date(dt).toLocaleString();
      },
      async cancelAppt(appt) {
        try {
          // Dispatch the cancel appointment action with the appointment ID
          await this.$store.dispatch('user/cancelAppointment', {
            appointmentId: appt.id
          });
          // Re-fetch the appointments to update the list after cancellation
          await this.$store.dispatch('user/fetchUserAppointments');
        } catch (error) {
          console.error('Failed to cancel appointment', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .my-appointments-page {
    padding: 2rem;
    background-color: #f7fafc;
    min-height: 100vh;
  }
  
  .page-title {
    font-size: 1.75rem;
    color: #2d3748;
    margin-bottom: 1.5rem;
  }
  
  /* Loading state */
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
  
  /* Empty state */
  .empty-state {
    text-align: center;
    padding: 3rem 0;
    color: #a0aec0;
  }
  
  .book-button {
    display: inline-block;
    background-color: #3182ce;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    text-decoration: none;
    font-weight: 500;
    margin-top: 1rem;
  }
  
  .book-button:hover {
    background-color: #2c5282;
  }
  
  /* Appointments list */
  .appointments-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .appointment-card {
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .appointment-info {
    display: flex;
    flex-direction: column;
  }
  
  .medic-name {
    font-weight: 600;
    color: #2d3748;
    margin: 0;
  }
  
  .appointment-datetime {
    font-size: 0.875rem;
    color: #4a5568;
    margin: 0.25rem 0 0;
  }
  
  .cancel-button {
    background-color: #fed7d7;
    color: #e53e3e;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .cancel-button:hover {
    background-color: #feb2b2;
  }
  </style>
  