<!-- src/components/common/Sidebar.vue -->
<template>
    <aside class="sidebar">
      <div class="sidebar-user">
        <div class="user-avatar">{{ userInitials }}</div>
        <div class="user-info">
          <p class="user-name">{{ currentUser?.email }}</p>
          <p class="user-role">{{ currentUser?.role }}</p>
        </div>
      </div>
  
      <div class="sidebar-links" v-if="currentUser">
        <!-- Admin Links -->
        <div v-if="currentUser.role === 'ADMIN'">
          <router-link to="/admin/dashboard" class="sidebar-link">
            <i class="fas fa-tachometer-alt"></i> Dashboard
          </router-link>
          <router-link to="/admin/medics" class="sidebar-link">
            <i class="fas fa-user-md"></i> Medic Management
          </router-link>
          <router-link to="/admin/reports" class="sidebar-link">
            <i class="fas fa-chart-bar"></i> Reports
          </router-link>
        </div>
  
        <!-- Medic Links -->
        <div v-if="currentUser.role === 'MEDIC'">
          <router-link to="/medic/dashboard" class="sidebar-link">
            <i class="fas fa-tachometer-alt"></i> Dashboard
          </router-link>
          <router-link to="/medic/schedule" class="sidebar-link">
            <i class="fas fa-calendar-alt"></i> Schedule
          </router-link>
          <router-link to="/medic/patients" class="sidebar-link">
            <i class="fas fa-users"></i> Patients
          </router-link>
          <router-link to="/medic/invite" class="sidebar-link">
            <i class="fas fa-envelope"></i> Invite User
          </router-link>
        </div>
  
        <!-- User Links -->
        <div v-if="currentUser.role === 'USER'">
          <router-link to="/user/dashboard" class="sidebar-link">
            <i class="fas fa-tachometer-alt"></i> Dashboard
          </router-link>
          <router-link to="/user/appointments" class="sidebar-link">
            <i class="fas fa-calendar-check"></i> My Appointments
          </router-link>
          <router-link to="/user/book" class="sidebar-link">
            <i class="fas fa-plus-circle"></i> Book Appointment
          </router-link>
          <router-link to="/user/profile" class="sidebar-link">
            <i class="fas fa-user"></i> Profile
          </router-link>
        </div>
      </div>
    </aside>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    name: 'Sidebar',
    computed: {
      ...mapGetters('auth', ['currentUser']),
      userInitials() {
        if (!this.currentUser) return '';
        const name = this.currentUser.email.split('@')[0];
        return name.charAt(0).toUpperCase();
      }
    }
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 250px;
    background-color: #2d3748;
    color: #e2e8f0;
    height: 100vh;
    position: fixed;
    display: flex;
    flex-direction: column;
  }
  .sidebar-user {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #4a5568;
  }
  .user-avatar {
    background: #3182ce;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
  }
  .sidebar-links {
    padding: 1rem 0;
    flex: 1;
  }
  .sidebar-link {
    display: block;
    padding: 0.75rem 1rem;
    color: #cbd5e0;
    text-decoration: none;
  }
  .sidebar-link:hover {
    background-color: #4a5568;
    color: #fff;
  }
  </style>
  