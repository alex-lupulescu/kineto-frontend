<template>
    <AuthenticatedLayout>
      <div class="dashboard">
        <h1 class="page-title">User Dashboard</h1>
        
        <div v-if="loading" class="loading-message">
          Loading dashboard...
        </div>
        
        <div v-else>
          <!-- Statistics Cards -->
          <div class="stats-cards">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-calendar-check"></i>
              </div>
              <div class="stat-details">
                <h3 class="stat-title">Upcoming Appointments</h3>
                <p class="stat-value">{{ stats.upcomingAppointments || 0 }}</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-box"></i>
              </div>
              <div class="stat-details">
                <h3 class="stat-title">Active Packages</h3>
                <p class="stat-value">{{ stats.activePackages || 0 }}</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <div class="stat-details">
                <h3 class="stat-title">Completed Sessions</h3>
                <p class="stat-value">{{ stats.completedSessions || 0 }}</p>
              </div>
            </div>
          </div>
          
          <!-- Dashboard Sections -->
          <div class="dashboard-sections">
            <!-- Upcoming Appointments Section -->
            <div class="section">
              <div class="section-header">
                <h2 class="section-title">Upcoming Appointments</h2>
                <router-link to="/user/appointments" class="view-all">View All</router-link>
              </div>
              <div class="section-content">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Medic</th>
                      <th>Date & Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="appt in upcomingAppointments" :key="appt.id">
                      <td>{{ appt.medicName }}</td>
                      <td>{{ formatDate(appt.startTime) }}</td>
                      <td>
                        <span class="status" :class="appt.status.toLowerCase()">
                          {{ appt.status }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <!-- Active Packages Section -->
            <div class="section">
              <div class="section-header">
                <h2 class="section-title">Active Packages</h2>
                <router-link to="/user/packages" class="view-all">View All</router-link>
              </div>
              <div class="section-content">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Package Name</th>
                      <th>Total Sessions</th>
                      <th>Remaining Sessions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="pkg in activePackages" :key="pkg.id">
                      <td>{{ pkg.name }}</td>
                      <td>{{ pkg.totalSessions }}</td>
                      <td>{{ pkg.remainingSessions }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  </template>
  
  <script>
  import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
 import UserService from '@/services/user.service';
  
  export default {
    name: 'UserDashboard',
    components: { AuthenticatedLayout },
    data() {
      return {
        loading: true,
        stats: {},
        upcomingAppointments: [],
        activePackages: []
      };
    },
    async created() {
      try {
        const response = await UserService.getDashboard();
        // Assuming the response contains keys: stats, upcomingAppointments, activePackages
        this.stats = response.data.stats;
        this.upcomingAppointments = response.data.upcomingAppointments;
        this.activePackages = response.data.activePackages;
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      } finally {
        this.loading = false;
      }
    },
    methods: {
      formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
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
  
  .loading-message {
    font-size: 1rem;
    color: #718096;
    text-align: center;
    padding: 2rem 0;
  }
  
  .stats-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .stat-card {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
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
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  .section {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
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
  
  .data-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .data-table th {
    text-align: left;
    padding: 0.75rem 0.5rem;
    font-size: 0.875rem;
    color: #4a5568;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .data-table td {
    padding: 0.75rem 0.5rem;
    color: #2d3748;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .status {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .status.scheduled {
    background-color: #bee3f8;
    color: #2b6cb0;
  }
  </style>
  