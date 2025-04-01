<template>
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link to="/">Kineto</router-link>
      </div>
      <div class="navbar-user">
        <span v-if="currentUser">
          {{ currentUser.firstName }} {{ currentUser.lastName }}
        </span>
        <span v-else>Guest</span>
        <button @click="logout" v-if="isAuthenticated">Logout</button>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
    computed: {
      isAuthenticated() {
        return this.$store.getters['auth/isAuthenticated'];
      },
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    padding: 0.75rem 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .brand-link {
    text-decoration: none;
    color: #3182ce;
  }
  .navbar-menu {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .user-info {
    margin-right: 1rem;
    color: #4a5568;
  }
  .role-badge {
    margin-left: 0.5rem;
    background: #ebf8ff;
    color: #3182ce;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
  }
  .logout-button {
    background: transparent;
    color: #e53e3e;
    border: 1px solid #e53e3e;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  