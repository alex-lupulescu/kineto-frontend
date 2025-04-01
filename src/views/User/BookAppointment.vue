<template>
    <AuthenticatedLayout>
      <div class="book-appointment">
        <h1 class="page-title">Book Appointment</h1>
        <form @submit.prevent="book">
          <div class="form-group">
            <label>Medic ID</label>
            <input v-model="form.medicId" type="number" required />
          </div>
          <div class="form-group">
            <label>Date</label>
            <input v-model="form.date" type="date" required />
          </div>
          <div class="form-group">
            <label>Start Time</label>
            <input v-model="form.startTime" type="time" required />
          </div>
          <div class="form-group">
            <label>End Time</label>
            <input v-model="form.endTime" type="time" required />
          </div>
          <button type="submit" :disabled="loading">{{ loading ? 'Booking...' : 'Book' }}</button>
        </form>
      </div>
    </AuthenticatedLayout>
  </template>
  
  <script>
  import { mapActions, mapState } from 'vuex';
  import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
  
  export default {
    name: 'BookAppointment',
    components: { AuthenticatedLayout },
    data() {
      return {
        form: {
          medicId: '',
          date: '',
          startTime: '',
          endTime: ''
        }
      };
    },
    computed: {
      ...mapState('user', ['loading'])
    },
    methods: {
      ...mapActions('user', ['bookAppointment']),
      async book() {
        try {
          await this.bookAppointment(this.form);
          alert('Appointment booked!');
          this.$router.push('/user/appointments');
        } catch {
          alert('Booking failed.');
        }
      }
    }
  };
  </script>
  
  
  <style scoped>
  .book-appointment-page {
    height: 100%;
  }
  
  .page-title {
    font-size: 1.75rem;
    color: #2d3748;
    margin-bottom: 1.5rem;
  }
  
  .booking-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 2rem;
  }
  
  .step-title {
    font-size: 1.25rem;
    color: #2d3748;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }
  
  /* Medic selection */
  .medics-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .medic-card {
    display: flex;
    align-items: center;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .medic-card:hover {
    border-color: #3182ce;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .medic-card.selected {
    border-color: #3182ce;
    background-color: #ebf8ff;
  }
  
  .medic-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #3182ce;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin-right: 1rem;
  }
  
  .medic-info {
    flex: 1;
  }
  
  .medic-name {
    margin: 0;
    font-size: 1rem;
    color: #2d3748;
  }
  
  .medic-speciality {
    margin: 0.25rem 0 0;
    font-size: 0.875rem;
    color: #718096;
  }
  
  /* Calendar */
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .calendar-nav-button {
    background-color: transparent;
    border: none;
    color: #4a5568;
    font-size: 1rem;
    cursor: pointer;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;
  }
  
  .calendar-nav-button:hover {
    background-color: #f7fafc;
  }
  
  .calendar-title {
    margin: 0;
    font-size: 1.25rem;
    color: #2d3748;
  }
  
  .calendar-days-header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .day-name {
    font-weight: 500;
    color: #4a5568;
  }
  
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
  
  .calendar-day {
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    padding: 0.5rem;
  }
  
  .calendar-day:hover:not(.disabled) {
    border-color: #3182ce;
  }
  
  .calendar-day.other-month {
    color: #a0aec0;
    background-color: #f7fafc;
  }
  
  .calendar-day.today {
    border-color: #3182ce;
  }
  
  .calendar-day.selected {
    background-color: #3182ce;
    color: white;
    border-color: #3182ce;
  }
  
  .calendar-day.selected .availability-indicator {
    color: #ebf8ff;
  }
  
  .calendar-day.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .day-number {
    font-size: 1.25rem;
    font-weight: 500;
  }
  
  .availability-indicator {
    font-size: 0.75rem;
    color: #3182ce;
    margin-top: 0.25rem;
  }
  
  /* Time slots */
  .time-slots {
    border-top: 1px solid #e2e8f0;
    padding-top: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .time-slots-title {
    font-size: 1.125rem;
    color: #2d3748;
    margin-bottom: 1rem;
  }
  
  .no-slots {
    color: #718096;
    text-align: center;
    padding: 1rem;
  }
  
  .time-slots-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.75rem;
  }
  
  .time-slot-button {
    background-color: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    padding: 0.75rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.875rem;
  }
  
  .time-slot-button:hover {
    border-color: #3182ce;
  }
  
  .time-slot-button.selected {
    background-color: #3182ce;
    color: white;
    border-color: #3182ce;
  }
  
  /* Appointment summary */
  .appointment-summary {
    margin-bottom: 2rem;
  }
  
  .summary-card {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1.5rem;
  }
  
  .summary-title {
    margin-top: 0;
    margin-bottom: 1.25rem;
    font-size: 1.25rem;
    color: #2d3748;
  }
  
  .summary-content {
    margin-bottom: 1.5rem;
  }
  
  .summary-row {
    display: flex;
    margin-bottom: 0.75rem;
  }
  
  .summary-label {
    width: 150px;
    color: #718096;
    font-weight: 500;
  }
  
  .summary-value {
    flex: 1;
    color: #2d3748;
  }
  
  .appointment-type-selection,
  .appointment-notes {
    margin-bottom: 1.25rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a5568;
    font-weight: 500;
  }
  
  select,
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-size: 0.875rem;
  }
  
  /* Confirmation */
  .booking-confirmation {
    text-align: center;
    padding: 2rem 0;
  }
  
  .confirmation-icon {
    font-size: 4rem;
    color: #48bb78;
    margin-bottom: 1.5rem;
  }
  
  .confirmation-title {
    color: #2d3748;
    margin-bottom: 1rem;
  }
  
  .confirmation-message {
    color: #4a5568;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .confirmation-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  
  /* Button styles */
  .step-actions {
    display: flex;
    justify-content: space-between;
  }
  
  .back-button,
  .next-button,
  .submit-button,
  .view-appointments-button,
  .book-another-button {
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
  }
  
  .back-button {
    background-color: transparent;
    color: #4a5568;
    border: 1px solid #e2e8f0;
  }
  
  .back-button:hover {
    background-color: #f7fafc;
  }
  
  .back-button i {
    margin-right: 0.5rem;
  }
  
  .next-button {
    background-color: #3182ce;
    color: white;
    border: none;
  }
  
  .next-button:hover {
    background-color: #2c5282;
  }
  
  .next-button:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
  
  .next-button i {
    margin-left: 0.5rem;
  }
  
  .submit-button {
    background-color: #48bb78;
    color: white;
    border: none;
  }
  
  .submit-button:hover {
    background-color: #38a169;
  }
  
  .submit-button:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
  
  .view-appointments-button {
    background-color: #3182ce;
    color: white;
    border: none;
    text-decoration: none;
  }
  
  .view-appointments-button:hover {
    background-color: #2c5282;
  }
  
  .book-another-button {
    background-color: transparent;
    color: #3182ce;
    border: 1px solid #3182ce;
  }
  
  .book-another-button:hover {
    background-color: #ebf8ff;
  }
  </style>