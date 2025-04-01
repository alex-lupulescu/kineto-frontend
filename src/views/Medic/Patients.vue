<template>
    <AuthenticatedLayout>
      <div class="patients-page">
        <h1 class="page-title">My Patients</h1>
        <input type="text" v-model="searchQuery" placeholder="Search patients..." />
        <button @click="fetchMyPatients">Refresh</button>
        
        <div v-if="loading">Loading...</div>
        <div v-else>
          <ul>
            <li v-for="p in filteredPatients" :key="p.id">
              {{ p.firstName }} {{ p.lastName }}
              <button @click="assignPackage(p)">Assign Package</button>
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
    name: 'Patients',
    components: {
      AuthenticatedLayout
    },
    data() {
      return {
        searchQuery: ''
      };
    },
    computed: {
      ...mapState('medic', ['patients', 'loading']),
      filteredPatients() {
        if (!this.searchQuery) return this.patients;
        const q = this.searchQuery.toLowerCase();
        return this.patients.filter(p => 
          (p.firstName + ' ' + p.lastName).toLowerCase().includes(q)
        );
      }
    },
    methods: {
      ...mapActions('medic', ['fetchPatients']),
      fetchMyPatients() {
        this.fetchPatients();
      },
      assignPackage(patient) {
        // e.g. show a modal or dispatch a store action
        alert(`Assigning package to ${patient.firstName}`);
      }
    },
    mounted() {
      this.fetchMyPatients();
    }
  };
  </script>
  
  
  <style scoped>
  .patients-page {
    height: 100%;
  }
  
  .page-header {
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
  
  .invite-button {
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
  
  .invite-button:hover {
    background-color: #2c5282;
  }
  
  .invite-button i {
    margin-right: 0.5rem;
  }
  
  .patients-container {
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
  
  /* Patients Table */
  .patients-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5rem;
  }
  
  .patients-table th {
    text-align: left;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    color: #4a5568;
    font-weight: 600;
    border-bottom: 2px solid #e2e8f0;
  }
  
  .patients-table td {
    padding: 1rem;
    border-bottom: 1px solid #e2e8f0;
    vertical-align: middle;
  }
  
  .patient-name-cell {
    display: flex;
    align-items: center;
  }
  
  .patient-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #3182ce;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin-right: 0.75rem;
    font-size: 0.875rem;
  }
  
  .patient-name {
    font-weight: 500;
    color: #2d3748;
  }
  
  .patient-contact {
    font-size: 0.875rem;
    color: #4a5568;
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.25rem;
  }
  
  .contact-item:last-child {
    margin-bottom: 0;
  }
  
  .contact-item i {
    width: 16px;
    margin-right: 0.5rem;
    color: #a0aec0;
  }
  
  .status-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .status-badge.status-active {
    background-color: #c6f6d5;
    color: #2f855a;
  }
  
  .status-badge.status-inactive {
    background-color: #edf2f7;
    color: #718096;
  }
  
  .status-badge.status-scheduled {
    background-color: #ebf8ff;
    color: #3182ce;
  }
  
  .status-badge.status-completed {
    background-color: #c6f6d5;
    color: #2f855a;
  }
  
  .status-badge.status-cancelled {
    background-color: #fed7d7;
    color: #e53e3e;
  }
  
  .status-badge.small {
    font-size: 0.675rem;
    padding: 0.125rem 0.5rem;
  }
  
  .package-info {
    font-size: 0.875rem;
    color: #4a5568;
  }
  
  .sessions-badge {
    display: inline-block;
    padding: 0.125rem 0.5rem;
    background-color: #ebf8ff;
    color: #3182ce;
    border-radius: 9999px;
    font-size: 0.75rem;
    margin-left: 0.5rem;
  }
  
  .no-package,
  .no-visits {
    color: #a0aec0;
    font-size: 0.875rem;
    font-style: italic;
  }
  
  .actions-cell {
    display: flex;
    gap: 0.5rem;
  }
  
  .action-button {
    background-color: transparent;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    color: #4a5568;
  }
  
  .action-button:hover {
    background-color: #f7fafc;
  }
  
  .action-button.view:hover {
    color: #3182ce;
  }
  
  .action-button.schedule:hover {
    color: #38a169;
  }
  
  .action-button.package:hover {
    color: #805ad5;
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
  
  .modal-container.patient-modal {
    width: 700px;
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
  
  /* Patient Profile */
  .patient-profile {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .patient-header {
    display: flex;
    align-items: center;
  }
  
  .large-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #3182ce;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin-right: 1rem;
    font-size: 1.25rem;
  }
  
  .patient-header-info {
    flex: 1;
  }
  
  .patient-full-name {
    margin: 0 0 0.25rem 0;
    font-size: 1.5rem;
    color: #2d3748;
  }
  
  .profile-section {
    border-top: 1px solid #e2e8f0;
    padding-top: 1rem;
  }
  
  .section-title {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.125rem;
    color: #2d3748;
  }
  
  .profile-info-row {
    display: flex;
    margin-bottom: 0.5rem;
  }
  
  .info-label {
    width: 100px;
    color: #718096;
    font-weight: 500;
  }
  
  .info-value {
    flex: 1;
    color: #2d3748;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .schedule-button {
    background-color: #3182ce;
    color: white;
    border: none;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .schedule-button:hover {
    background-color: #2c5282;
  }
  
  .schedule-button i {
    margin-right: 0.25rem;
  }
  
  /* Package Details */
  .package-details {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
  }
  
  .package-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }
  
  .package-name {
    margin: 0;
    font-size: 1rem;
    color: #2d3748;
  }
  
  .package-date {
    font-size: 0.75rem;
    color: #718096;
  }
  
  .sessions-progress {
    margin-bottom: 1rem;
  }
  
  .progress-label {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: #4a5568;
    margin-bottom: 0.25rem;
  }
  
  .progress-bar {
    height: 8px;
    background-color: #edf2f7;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background-color: #3182ce;
    border-radius: 4px;
  }
  
  .assign-package-button {
    width: 100%;
    padding: 0.75rem;
    background-color: #3182ce;
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .assign-package-button:hover {
    background-color: #2c5282;
  }
  
  .assign-package-button i {
    margin-right: 0.5rem;
  }
  
  .no-package-details {
    text-align: center;
    padding: 1.5rem;
  }
  
  .no-package-details p {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #718096;
  }
  
  /* Appointment items */
  .appointment-item {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    border-radius: 0.375rem;
    background-color: #f7fafc;
    margin-bottom: 0.5rem;
  }
  
  .appointment-item.appointment-upcoming {
    border-left: 3px solid #3182ce;
  }
  
  .appointment-item.appointment-past {
    border-left: 3px solid #a0aec0;
  }
  
  .appointment-item.appointment-cancelled {
    border-left: 3px solid #e53e3e;
  }
  
  .appointment-date,
  .appointment-time,
  .appointment-type {
    margin-right: 1rem;
    font-size: 0.875rem;
    color: #4a5568;
    display: flex;
    align-items: center;
  }
  
  .appointment-date i,
  .appointment-time i {
    margin-right: 0.25rem;
    color: #a0aec0;
  }
  
  .appointment-date {
    width: 120px;
  }
  
  .appointment-time {
    width: 100px;
  }
  
  .appointment-type {
    flex: 1;
  }
  
  .no-appointments {
    color: #a0aec0;
    font-style: italic;
    text-align: center;
    padding: 1rem;
  }
  
  .view-all-button {
    display: block;
    width: 100%;
    padding: 0.5rem;
    text-align: center;
    background-color: transparent;
    color: #3182ce;
    border: 1px solid #3182ce;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .view-all-button:hover {
    background-color: #ebf8ff;
  }
  
  /* Notes */
  .notes-textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    resize: vertical;
    margin-bottom: 0.75rem;
    font-family: inherit;
    font-size: 0.875rem;
  }
  
  .save-notes-button {
    padding: 0.5rem 1rem;
    background-color: #3182ce;
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .save-notes-button:hover:not(:disabled) {
    background-color: #2c5282;
  }
  
  .save-notes-button:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
  
  /* Package Selection */
  .package-selection {
    margin-bottom: 1.5rem;
  }
  
  .package-selection h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1rem;
    color: #2d3748;
  }
  
  .packages-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  
  .package-card {
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .package-card:hover {
    border-color: #3182ce;
  }
  
  .package-card.selected {
    border-color: #3182ce;
    background-color: #ebf8ff;
  }
  
  .package-card-name {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    color: #2d3748;
  }
  
  .package-card-sessions {
    font-size: 0.875rem;
    color: #4a5568;
    margin-bottom: 0.25rem;
  }
  
  .package-card-price {
    font-size: 1rem;
    font-weight: 600;
    color: #3182ce;
  }
  
  .custom-sessions {
    margin-bottom: 1.5rem;
  }
  
  .custom-sessions label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a5568;
    font-weight: 500;
  }
  
  .custom-sessions input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
  }
  
  /* Modal Actions */
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
  
  .cancel-button,
  .confirm-button {
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .cancel-button {
    background-color: transparent;
    color: #4a5568;
    border: 1px solid #e2e8f0;
  }
  
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
  </style>