<!-- src/views/Admin/MedicManagement.vue -->
<template>
    <AuthenticatedLayout>
      <div class="medic-management">
        <div class="header-row">
          <h1 class="page-title">Medic Management</h1>
          <button class="invite-button" @click="navigateToInvite">
            <i class="fas fa-user-plus"></i> Invite New Medic
          </button>
        </div>
        
        <!-- Filter & Search -->
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
          <p v-if="searchQuery">
            Try a different search term.
          </p>
          <p v-else>
            You can invite new medics to join your platform.
          </p>
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
                <td>
                  {{ medic.firstName }} {{ medic.lastName }}
                </td>
                <td>
                  {{ medic.email }}
                </td>
                <td>
                  {{ medic.specialization || 'N/A' }}
                </td>
                <td>
                  <span
                    class="status-badge"
                    :class="medic.active ? 'status-active' : 'status-inactive'"
                  >
                    {{ medic.active ? 'Active' : 'Inactive' }}
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
                    :class="medic.active ? 'suspend' : 'activate'"
                    @click="toggleStatus(medic)"
                  >
                    <i 
                      class="fas"
                      :class="medic.active ? 'fa-user-slash' : 'fa-user-check'"
                    ></i>
                    {{ medic.active ? 'Suspend' : 'Activate' }}
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
              @click="currentPage--"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            
            <span class="pagination-info">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            
            <button
              class="pagination-button"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
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
              <button class="close-button" @click="showMedicModal = false">
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
                      :class="selectedMedic.active ? 'status-active' : 'status-inactive'"
                    >
                      {{ selectedMedic.active ? 'Active' : 'Inactive' }}
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
                    <div class="info-value">{{ selectedMedic.lastLogin ? formatDate(selectedMedic.lastLogin) : 'Never' }}</div>
                  </div>
                </div>
                
                <!-- Medic Activity Log -->
                <MedicActivityLog :medicId="selectedMedic.id" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
  import MedicActivityLog from '@/components/admin/MedicActivityLog.vue';
  
  export default {
    name: 'MedicManagement',
    components: {
      AuthenticatedLayout,
      MedicActivityLog
    },
    setup() {
      const router = useRouter();
      const loading = ref(true);
      const medics = ref([]);
      const filter = ref('all');
      const searchQuery = ref('');
      const currentPage = ref(1);
      const itemsPerPage = ref(5);
  
      // Modal
      const showMedicModal = ref(false);
      const selectedMedic = ref({});
  
      onMounted(() => {
        // Simulate fetch from API
        setTimeout(() => {
          medics.value = [
            {
              id: 1,
              firstName: 'John',
              lastName: 'Smith',
              email: 'john.smith@kineto.com',
              phone: '(123) 456-7890',
              specialization: 'Physiotherapy',
              active: true,
              createdAt: '2023-01-10T10:00:00',
              lastLogin: '2023-06-15T09:20:00'
            },
            {
              id: 2,
              firstName: 'Emma',
              lastName: 'Johnson',
              email: 'emma.johnson@kineto.com',
              phone: null,
              specialization: 'Orthopedics',
              active: true,
              createdAt: '2022-12-01T08:30:00',
              lastLogin: '2023-06-10T14:45:00'
            },
            {
              id: 3,
              firstName: 'Michael',
              lastName: 'Brown',
              email: 'michael.brown@kineto.com',
              phone: '(555) 123-4567',
              specialization: '',
              active: false,
              createdAt: '2023-01-15T13:00:00',
              lastLogin: null
            }
          ];
          loading.value = false;
        }, 1000);
      });
  
      // Filtering
      const filteredMedics = computed(() => {
        let result = [...medics.value];
  
        // Filter by status
        if (filter.value !== 'all') {
          result = result.filter(medic => {
            return filter.value === 'active' ? medic.active : !medic.active;
          });
        }
        // Filter by search
        if (searchQuery.value.trim()) {
          const query = searchQuery.value.toLowerCase();
          result = result.filter(medic =>
            (medic.firstName + ' ' + medic.lastName).toLowerCase().includes(query) ||
            medic.email.toLowerCase().includes(query)
          );
        }
        return result;
      });
  
      // Pagination
      const totalPages = computed(() => {
        return Math.ceil(filteredMedics.value.length / itemsPerPage.value);
      });
      const paginatedMedics = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return filteredMedics.value.slice(start, end);
      });
  
      // Methods
      const navigateToInvite = () => {
        router.push('/admin/medics/invite');
      };
  
      const viewMedic = medic => {
        selectedMedic.value = { ...medic };
        showMedicModal.value = true;
      };
  
      const toggleStatus = medic => {
        // In a real implementation, call an API to update medic status
        medic.active = !medic.active;
        alert(
          `Medic ${medic.firstName} ${medic.lastName} is now ${
            medic.active ? 'Active' : 'Suspended'
          }`
        );
      };
  
      const getMedicInitials = medic => {
        if (!medic.firstName || !medic.lastName) return '';
        return `${medic.firstName.charAt(0)}${medic.lastName.charAt(0)}`;
      };
  
      const formatDate = dateString => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString();
      };
  
      return {
        loading,
        medics,
        filter,
        searchQuery,
        currentPage,
        itemsPerPage,
        showMedicModal,
        selectedMedic,
  
        filteredMedics,
        totalPages,
        paginatedMedics,
  
        navigateToInvite,
        viewMedic,
        toggleStatus,
        getMedicInitials,
        formatDate
      };
    }
  };
  </script>
  
  <style scoped>
  /* Basic styling for table, modals, and layout – see earlier examples */
  </style>
  