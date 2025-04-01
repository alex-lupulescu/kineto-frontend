<template>
    <AuthenticatedLayout>
      <div class="schedule-page">
        <h1 class="page-title">Schedule</h1>
        <p>Display a calendar or daily/week view with appointments.</p>
  
        <!-- Example usage: dispatch to store to fetch appointments for a date -->
        <input type="date" v-model="dateString" @change="fetchAppointments" />
        <div v-if="loading">Loading appointments...</div>
        <div v-else>
          <ul>
            <li v-for="appt in appointments" :key="appt.id">
              {{ appt.patientName }} - {{ formatDate(appt.startTime) }} - {{ appt.status }}
            </li>
          </ul>
        </div>
      </div>
    </AuthenticatedLayout>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
  
  export default {
    name: 'Schedule',
    components: {
      AuthenticatedLayout
    },
    data() {
      return {
        dateString: ''
      };
    },
    computed: {
      ...mapState('medic', ['appointments', 'loading'])
    },
    methods: {
      ...mapActions('medic', ['fetchAppointments']),
      formatDate(dt) {
        return new Date(dt).toLocaleString();
      }
    }
  };
  </script>
  
  
  <style scoped>
  .schedule-page {
    height: 100%;
  }
  
  .schedule-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .page-title {
    font-size: 1.75rem;
    color: #2d3748;
    margin: 0;
  }
  
  .new-appointment-button {
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
  }
  
  .new-appointment-button:hover {
    background-color: #2c5282;
  }
  
  .new-appointment-button i {
    margin-right: 0.5rem;
  }
  
  .calendar-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    height: calc(100% - 4rem);
  }
  
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .calendar-nav {
    display: flex;
    align-items: center;
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
    margin: 0 1rem;
    font-size: 1.25rem;
    color: #2d3748;
  }
  
  .view-switcher {
    display: flex;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    overflow: hidden;
  }
  
  .view-button {
    background-color: white;
    border: none;
    color: #4a5568;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .view-button:hover {
    background-color: #f7fafc;
  }
  
  .view-button.active {
    background-color: #3182ce;
    color: white;
  }
  
  /* Month View */
  .month-view {
    padding: 1rem;
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
    grid-template-rows: repeat(6, 1fr);
    height: calc(100% - 2.5rem);
  }
  
  .calendar-day {
    border: 1px solid #e2e8f0;
    min-height: 80px;
    padding: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .calendar-day:hover {
    background-color: #f7fafc;
  }
  
  .calendar-day.other-month {
    color: #a0aec0;
    background-color: #f7fafc;
  }
  
  .calendar-day.today {
    border: 2px solid #3182ce;
  }
  
  .day-header {
    display: flex;
    justify-content: flex-end;
  }
  
  .day-number {
    display: inline-block;
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    border-radius: 50%;
  }
  
  .today .day-number {
    background-color: #3182ce;
    color: white;
  }
  
  .day-events {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .event-dot {
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background-color: #3182ce;
  }
  
  .event-dot.event-completed {
    background-color: #48bb78;
  }
  
  .event-dot.event-cancelled {
    background-color: #e53e3e;
  }
  
  .event-more {
    font-size: 0.75rem;
    color: #718096;
    text-align: center;
    margin-top: 0.25rem;
  }
  
  /* Week View */
  .week-view {
    display: flex;
    flex-direction: column;
    height: calc(100% - 4rem);
  }
  
  .week-header {
    display: grid;
    grid-template-columns: 60px repeat(7, 1fr);
    border-bottom: 1px solid #e2e8f0;
  }
  
  .week-day-header {
    padding: 0.75rem;
    text-align: center;
    border-left: 1px solid #e2e8f0;
  }
  
  .week-day-header.today {
    background-color: #ebf8ff;
  }
  
  .week-day-name {
    font-weight: 500;
    color: #4a5568;
  }
  
  .week-day-number {
    font-size: 1.25rem;
    color: #2d3748;
    margin-top: 0.25rem;
  }
  
  .week-body {
    display: flex;
    height: 100%;
    overflow-y: auto;
  }
  
  .week-time-column {
    width: 60px;
    padding-top: 0.5rem;
  }
  
  .time-slot {
    height: 60px;
    display: flex;
    align-items: flex-start;
    padding-right: 0.5rem;
    justify-content: flex-end;
    color: #718096;
    font-size: 0.75rem;
  }
  
  .week-days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    width: 100%;
    position: relative;
  }
  
  .week-day-column {
    position: relative;
    border-left: 1px solid #e2e8f0;
  }
  
  .week-time-slot {
    height: 60px;
    border-bottom: 1px solid #f7fafc;
  }
  
  .week-event {
    position: absolute;
    width: 90%;
    left: 5%;
    background-color: #bee3f8;
    border-radius: 4px;
    padding: 0.5rem;
    font-size: 0.875rem;
    overflow: hidden;
    cursor: pointer;
    color: #2c5282;
  }
  
  .week-event.event-completed {
    background-color: #c6f6d5;
    color: #2f855a;
  }
  
  .week-event.event-cancelled {
    background-color: #fed7d7;
    color: #c53030;
  }
  
  .event-time {
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .event-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
  }
  
  /* Day View */
  .day-view {
    display: flex;
    flex-direction: column;
    height: calc(100% - 4rem);
  }
  
  .day-header {
    display: grid;
    grid-template-columns: 60px 1fr;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .day-title {
    padding: 0.75rem;
    text-align: center;
  }
  
  .day-title.today {
    background-color: #ebf8ff;
  }
  
  .day-name {
    font-weight: 500;
    color: #4a5568;
  }
  
  .day-number {
    font-size: 1.25rem;
    color: #2d3748;
    margin-top: 0.25rem;
  }
  
  .day-body {
    display: flex;
    height: 100%;
    overflow-y: auto;
  }
  
  .day-events-column {
    position: relative;
    width: 100%;
  }
  
  .day-time-slot {
    height: 60px;
    border-bottom: 1px solid #f7fafc;
  }
  
  .day-event {
    position: absolute;
    width: 90%;
    left: 5%;
    background-color: #bee3f8;
    border-radius: 4px;
    padding: 0.5rem;
    overflow: hidden;
    cursor: pointer;
    color: #2c5282;
  }
  
  .day-event.event-completed {
    background-color: #c6f6d5;
    color: #2f855a;
  }
  
  .day-event.event-cancelled {
    background-color: #fed7d7;
    color: #c53030;
  }
  
  .event-type {
    font-size: 0.75rem;
    margin-top: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
  }
  
  .close-button:hover {
    color: #4a5568;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
  </style>