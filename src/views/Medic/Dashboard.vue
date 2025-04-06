<template>
    <AuthenticatedLayout>
      <div class="user-dashboard">
        <h1 class="page-title">User Dashboard</h1>
        <p>Welcome to your personal dashboard, 
            <span v-if="currentUser">
          {{ currentUser.firstName }} {{ currentUser.lastName }}
        </span>
        </p>
      </div>
    </AuthenticatedLayout>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
  
  export default {
    name: 'UserDashboard',
    components: { AuthenticatedLayout },
    computed: {
      ...mapGetters('auth', ['currentUser'])
    }
  };
  </script>
  
  <style scoped>
  .dashboard {
    height: 100%;
  }
  
  .page-title {
    font-size: 1.75rem;
    color: #2d3748;
    margin-bottom: 1.5rem;
  }
  
  .stats-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .stat-card {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
  }
  
  .stat-icon {
    background-color: #ebf8ff;
    color: #3182ce;
    width: 50px;
    height: 50px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    margin-right: 1rem;
  }
  
  .stat-details {
    flex: 1;
  }
  
  .stat-title {
    font-size: 0.875rem;
    color: #718096;
    margin: 0 0 0.5rem 0;
  }
  
  .stat-value {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3748;
    margin: 0;
  }
  
  .dashboard-sections {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .section {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .calendar-section {
    grid-column: span 2;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .section-title {
    font-size: 1.25rem;
    margin: 0;
    color: #2d3748;
  }
  
  .view-all {
    background-color: transparent;
    color: #3182ce;
    border: none;
    cursor: pointer;
    font-size: 0.875rem;
    text-decoration: none;
  }
  
  .section-content {
    padding: 1rem 1.5rem;
  }
  
  .calendar-date-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  
  .date-nav-button {
    background-color: #edf2f7;
    border: none;
    color: #4a5568;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .date-nav-button:hover {
    background-color: #e2e8f0;
  }
  
  .current-date {
    margin: 0 1rem;
    font-size: 1.25rem;
    color: #2d3748;
  }
  
  .loading-indicator {
    text-align: center;
    padding: 2rem 0;
    color: #718096;
  }
  
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
  
  .empty-message {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
  }
  
  .new-appointment-button {
    display: flex;
    align-items: center;
    background-color: #3182ce;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
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
  
  .appointments-timeline {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .appointment-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 8px;
    background-color: #edf2f7;
    border-left: 4px solid #3182ce;
  }
  
  .appointment-item.appointment-completed {
    border-left-color: #48bb78;
    background-color: #f0fff4;
  }
  
  .appointment-item.appointment-cancelled {
    border-left-color: #e53e3e;
    background-color: #fff5f5;
  }
  
  .appointment-item.appointment-scheduled {
    border-left-color: #3182ce;
    background-color: #ebf8ff;
  }
  
  .appointment-time {
    width: 140px;
    font-weight: 500;
    color: #4a5568;
  }
  
  .appointment-details {
    flex: 1;
  }
  
  .patient-name {
    margin: 0;
    font-size: 1rem;
    color: #2d3748;
  }
  
  .appointment-status {
    font-size: 0.875rem;
    margin: 0.25rem 0 0 0;
    color: #718096;
  }
  
  .appointment-type {
    font-size: 0.875rem;
    margin: 0.25rem 0 0 0;
    color: #718096;
    font-style: italic;
  }
  
  .appointment-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .action-button {
    background-color: transparent;
    border: none;
    color: #4a5568;
    cursor: pointer;
    padding: 0.25rem;
    font-size: 1rem;
  }
  
  .action-button:hover {
    color: #3182ce;
  }
  
  .patients-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .patient-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 8px;
    background-color: #f7fafc;
    border: 1px solid #e2e8f0;
  }
  
  .patient-avatar {
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
  
  .patient-details {
    flex: 1;
  }
  
  .patient-info {
    margin: 0.25rem 0 0 0;
    font-size: 0.875rem;
    color: #718096;
  }
  
  .remaining-sessions {
    display: inline-block;
    padding: 0.125rem 0.5rem;
    background-color: #ebf8ff;
    color: #3182ce;
    border-radius: 9999px;
    font-size: 0.75rem;
  }
  
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