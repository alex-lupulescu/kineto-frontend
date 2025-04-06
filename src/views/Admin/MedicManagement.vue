<!-- src/views/Admin/MedicManagement.vue -->
<template>
    <AuthenticatedLayout>
      <div class="medic-management">
        <!-- Header Row -->
        <div class="header-row">
          <h1 class="page-title">Medic Management</h1>
          <button class="invite-button" @click="navigateToInvite">
            <i class="fas fa-user-plus"></i> Invite New Medic
          </button>
        </div>
  
        <!-- Filter & Search Section -->
        <div class="filter-section">
          <div class="search-bar">
            <i class="fas fa-search search-icon"></i>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search medics by name, email..."
              class="search-input"
            />
          </div>
          <div class="filter-buttons">
            <button
              class="filter-button"
              :class="{ active: filter === 'all' }"
              @click="filter = 'all'"
            >
              All
            </button>
            <button
              class="filter-button"
              :class="{ active: filter === 'active' }"
              @click="filter = 'active'"
            >
              Active
            </button>
            <button
              class="filter-button"
              :class="{ active: filter === 'inactive' }"
              @click="filter = 'inactive'"
            >
              Inactive
            </button>
          </div>
        </div>
  
        <!-- Medic List -->
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Loading medics...</p>
        </div>
        <div v-else-if="filteredMedics.length === 0" class="empty-state">
          <i class="fas fa-user-md empty-icon"></i>
          <h3>No medics found</h3>
          <p v-if="searchQuery">Try a different search term.</p>
          <p v-else>You can invite new medics to join your platform.</p>
          <button class="invite-button" @click="navigateToInvite">
            <i class="fas fa-user-plus"></i> Invite New Medic
          </button>
        </div>
        <div v-else>
          <table class="medics-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Specialty</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="medic in paginatedMedics" :key="medic.id">
                <td>{{ medic.firstName }} {{ medic.lastName }}</td>
                <td>{{ medic.email }}</td>
                <td>{{ medic.specialization || 'N/A' }}</td>
                <td>
                  <span
                    class="status-badge"
                    :class="(medic.accountStatus === 'ACTIVE') ? 'status-active' : 'status-inactive'"
                  >
                    {{ (medic.accountStatus === 'ACTIVE') ? 'Active' : 'Suspended' }}
                  </span>
                </td>
                <td>
                  <button
                    class="action-button view"
                    @click="viewMedic(medic)"
                    title="View Medic Details"
                  >
                    <i class="fas fa-eye"></i>
                  </button>
                  <button
                    class="action-button"
                    :class="(medic.accountStatus === 'ACTIVE') ? 'suspend' : 'activate'"
                    @click="toggleStatus(medic)"
                    :title="(medic.accountStatus === 'ACTIVE') ? 'Suspend Medic' : 'Activate Medic'"
                  >
                    <i class="fas" :class="(medic.accountStatus === 'ACTIVE') ? 'fa-user-slash' : 'fa-user-check'"></i>
                    {{ (medic.accountStatus === 'ACTIVE') ? 'Suspend' : 'Activate' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
  
          <!-- Pagination -->
          <div class="pagination">
            <button
              class="pagination-button"
              :disabled="currentPage === 1"
              @click="prevPage"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            <span class="pagination-info">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <button
              class="pagination-button"
              :disabled="currentPage === totalPages"
              @click="nextPage"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
  
        <!-- Medic Details Modal -->
        <div v-if="showMedicModal" class="modal-overlay">
          <div class="modal-container">
            <div class="modal-header">
              <h3>Medic Details</h3>
              <button class="close-button" @click="closeModal">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="medic-profile">
                <div class="profile-header">
                  <div class="large-avatar">
                    {{ getMedicInitials(selectedMedic) }}
                  </div>
                  <div class="profile-header-info">
                    <h2 class="medic-full-name">
                      Dr. {{ selectedMedic.firstName }} {{ selectedMedic.lastName }}
                    </h2>
                    <span
                      class="status-badge"
                      :class="(selectedMedic.accountStatus === 'ACTIVE') ? 'status-active' : 'status-inactive'"
                    >
                      {{ (selectedMedic.accountStatus === 'ACTIVE') ? 'Active' : 'Suspended' }}
                    </span>
                  </div>
                </div>
  
                <div class="profile-section">
                  <h4 class="section-title">Contact Information</h4>
                  <div class="profile-info-row">
                    <div class="info-label">Email:</div>
                    <div class="info-value">{{ selectedMedic.email }}</div>
                  </div>
                  <div class="profile-info-row">
                    <div class="info-label">Phone:</div>
                    <div class="info-value">{{ selectedMedic.phone || 'Not provided' }}</div>
                  </div>
                </div>
  
                <div class="profile-section">
                  <h4 class="section-title">Specialization</h4>
                  <div class="profile-info-row">
                    <div class="info-label">Area:</div>
                    <div class="info-value">{{ selectedMedic.specialization || 'Not specified' }}</div>
                  </div>
                </div>
  
                <div class="profile-section">
                  <h4 class="section-title">System Information</h4>
                  <div class="profile-info-row">
                    <div class="info-label">User ID:</div>
                    <div class="info-value">{{ selectedMedic.id }}</div>
                  </div>
                  <div class="profile-info-row">
                    <div class="info-label">Created:</div>
                    <div class="info-value">{{ formatDate(selectedMedic.createdAt) }}</div>
                  </div>
                  <div class="profile-info-row">
                    <div class="info-label">Last Login:</div>
                    <div class="info-value">
                      {{ selectedMedic.lastLogin ? formatDate(selectedMedic.lastLogin) : 'Never' }}
                    </div>
                  </div>
                </div>
  
                <!-- Medic Activity Log Component -->
                <MedicActivityLog :medicId="selectedMedic.id" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  </template>
  
  <script>
  import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
  import MedicActivityLog from '@/components/admin/MedicActivityLog.vue';
  import AdminService from '@/services/admin.service';
  
  export default {
    name: 'MedicManagement',
    components: {
      AuthenticatedLayout,
      MedicActivityLog
    },
    data() {
      return {
        loading: true,
        medics: [],
        filter: 'all',
        searchQuery: '',
        currentPage: 1,
        itemsPerPage: 5,
        showMedicModal: false,
        selectedMedic: {}
      };
    },
    computed: {
      filteredMedics() {
        let result = [...this.medics];
        // Filter by account status using accountStatus field
        if (this.filter !== 'all') {
          result = result.filter(medic => {
            return this.filter === 'active'
              ? medic.accountStatus === 'ACTIVE'
              : medic.accountStatus !== 'ACTIVE';
          });
        }
        // Filter by search query
        if (this.searchQuery.trim()) {
          const query = this.searchQuery.toLowerCase();
          result = result.filter(medic =>
            (`${medic.firstName} ${medic.lastName}`.toLowerCase().includes(query) ||
              medic.email.toLowerCase().includes(query))
          );
        }
        return result;
      },
      totalPages() {
        return Math.ceil(this.filteredMedics.length / this.itemsPerPage);
      },
      paginatedMedics() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredMedics.slice(start, end);
      }
    },
    methods: {
      loadMedics() {
        this.loading = true;
        // Replace the following simulated API call with a real call:
        AdminService.getAllMedics()
          .then(response => {
            this.medics = response.data;
          })
          .catch(error => {
            console.error('Failed to fetch medics:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },
      navigateToInvite() {
        this.$router.push('/admin/medics/invite');
      },
      viewMedic(medic) {
        this.selectedMedic = { ...medic };
        this.showMedicModal = true;
      },
      closeModal() {
        this.showMedicModal = false;
      },
      toggleStatus(medic) {
        const newStatus =
          medic.accountStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
        // Call the API to update status
        AdminService.updateMedicStatus(medic.id, newStatus)
          .then(() => {
            medic.accountStatus = newStatus;
            alert(
              `Medic ${medic.firstName} ${medic.lastName} is now ${
                medic.accountStatus === 'ACTIVE' ? 'Active' : 'Suspended'
              }`
            );
          })
          .catch(error => {
            console.error('Failed to update status:', error);
            alert('Error updating status.');
          });
      },
      getMedicInitials(medic) {
        if (!medic.firstName || !medic.lastName) return '';
        return medic.firstName.charAt(0) + medic.lastName.charAt(0);
      },
      formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString();
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      }
    },
    mounted() {
      this.loadMedics();
    }
  };
  </script>
  
  <style scoped>
  /* Header Row */
  .header-row {
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
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  .invite-button:hover {
    background-color: #2c5282;
  }
  
  /* Filter Section */
  .filter-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
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
    border-radius: 4px;
    font-size: 1rem;
  }
  .filter-buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  .filter-button {
    padding: 0.5rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    background-color: white;
    color: #4a5568;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  .filter-button:hover {
    background-color: #f7fafc;
  }
  .filter-button.active {
    background-color: #3182ce;
    color: white;
    border-color: #3182ce;
  }
  
  /* Loading & Empty States */
  .loading-state,
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
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
    to {
      transform: rotate(360deg);
    }
  }
  .empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  /* Medic Table */
  .medics-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5rem;
  }
  .medics-table th {
    text-align: left;
    padding: 0.75rem 0.5rem;
    font-size: 1rem;
    color: #4a5568;
    border-bottom: 1px solid #e2e8f0;
  }
  .medics-table td {
    padding: 0.75rem 0.5rem;
    color: #2d3748;
    border-bottom: 1px solid #e2e8f0;
  }
  .status-badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
  }
  .status-active {
    background-color: #c6f6d5;
    color: #2f855a;
  }
  .status-inactive {
    background-color: #fed7d7;
    color: #c53030;
  }
  
  /* Action Buttons */
  .action-button {
    background-color: transparent;
    border: none;
    color: #4a5568;
    cursor: pointer;
    padding: 0.25rem;
    font-size: 1.125rem;
    margin-right: 0.25rem;
  }
  .action-button:hover {
    color: #3182ce;
  }
  .action-button.suspend {
    color: #e53e3e;
  }
  .action-button.activate {
    color: #2f855a;
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
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
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
    font-size: 1rem;
    color: #4a5568;
  }
  
  /* Modal Styles */
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
  .close-button {
    background-color: transparent;
    border: none;
    color: #a0aec0;
    cursor: pointer;
    font-size: 1.5rem;
  }
  .close-button:hover {
    color: #4a5568;
  }
  </style>
  