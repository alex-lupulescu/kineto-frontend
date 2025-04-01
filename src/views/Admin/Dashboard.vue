<!-- src/views/Admin/Dashboard.vue -->
<template>
    <AuthenticatedLayout>
      <div class="dashboard">
        <h1 class="page-title">Admin Dashboard</h1>
        
        <div class="stats-cards">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-user-md"></i>
            </div>
            <div class="stat-details">
              <h3 class="stat-title">Active Medics</h3>
              <p class="stat-value">{{ stats.activeMedics || 0 }}</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-users"></i>
            </div>
            <div class="stat-details">
              <h3 class="stat-title">Registered Users</h3>
              <p class="stat-value">{{ stats.totalUsers || 0 }}</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-calendar-check"></i>
            </div>
            <div class="stat-details">
              <h3 class="stat-title">Today's Appointments</h3>
              <p class="stat-value">{{ stats.todayAppointments || 0 }}</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <div class="stat-details">
              <h3 class="stat-title">This Month</h3>
              <p class="stat-value">{{ stats.monthAppointments || 0 }}</p>
            </div>
          </div>
        </div>
        
        <div class="dashboard-sections">
          <div class="section">
            <div class="section-header">
              <h2 class="section-title">Recent Medics</h2>
              <router-link to="/admin/medics" class="view-all">View All</router-link>
            </div>
            
            <div class="section-content">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="medic in recentMedics" :key="medic.id">
                    <td>{{ medic.firstName }} {{ medic.lastName }}</td>
                    <td>{{ medic.email }}</td>
                    <td>
                      <span class="status" :class="medic.active ? 'active' : 'inactive'">
                        {{ medic.active ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                    <td>
                      <button class="action-button">
                        <i class="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div class="section">
            <div class="section-header">
              <h2 class="section-title">Recent Appointments</h2>
              <button class="view-all">View All</button>
            </div>
            
            <div class="section-content">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Medic</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="appointment in recentAppointments" :key="appointment.id">
                    <td>{{ appointment.patientName }}</td>
                    <td>{{ appointment.medicName }}</td>
                    <td>{{ formatDate(appointment.date) }}</td>
                    <td>
                      <span class="status" :class="appointment.status.toLowerCase()">
                        {{ appointment.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  </template>
  
  <script>
  import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
  
  export default {
    name: 'AdminDashboard',
    components: {
      AuthenticatedLayout
    },
    data() {
      return {
        stats: {
          activeMedics: 0,
          totalUsers: 0,
          todayAppointments: 0,
          monthAppointments: 0
        },
        recentMedics: [],
        recentAppointments: []
      };
    },
    created() {
      // Pretend to load dashboard data from an API
      setTimeout(() => {
        this.stats = {
          activeMedics: 12,
          totalUsers: 145,
          todayAppointments: 24,
          monthAppointments: 342
        };
        this.recentMedics = [
          { id: 1, firstName: 'John', lastName: 'Smith', email: 'john@example.com', active: true },
          { id: 2, firstName: 'Emma', lastName: 'Johnson', email: 'emma@example.com', active: true },
          { id: 3, firstName: 'Michael', lastName: 'Brown', email: 'michael@example.com', active: false }
        ];
        this.recentAppointments = [
          { id: 1, patientName: 'Alice Cooper', medicName: 'John Smith', date: new Date(), status: 'Scheduled' },
          { id: 2, patientName: 'Bob Wilson', medicName: 'Emma Johnson', date: new Date(), status: 'Completed' }
        ];
      }, 1000);
    },
    methods: {
      formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
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
  
  .status.active {
    background-color: #c6f6d5;
    color: #2f855a;
  }
  
  .status.inactive {
    background-color: #fed7d7;
    color: #c53030;
  }
  
  .status.scheduled {
    background-color: #bee3f8;
    color: #2b6cb0;
  }
  
  .status.completed {
    background-color: #c6f6d5;
    color: #2f855a;
  }
  
  .status.cancelled {
    background-color: #fed7d7;
    color: #c53030;
  }
  
  .action-button {
    background-color: transparent;
    border: none;
    color: #4a5568;
    cursor: pointer;
    padding: 0.25rem;
  }
  
  .action-button:hover {
    color: #3182ce;
  }
  </style>