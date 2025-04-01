<!-- src/layouts/AuthenticatedLayout.vue -->
<template>
    <div class="app-layout">
      <Sidebar />
      <div class="main-content">
        <Navbar />
        <div class="content-wrapper">
          <slot />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/common/Navbar.vue';
  import Sidebar from '@/components/common/Sidebar.vue';
  
  export default {
    name: 'AuthenticatedLayout',
    components: {
      Navbar,
      Sidebar
    }
  };
  </script>
  
  <style scoped>
  .app-layout {
    display: flex;
    min-height: 100vh;
  }
  .main-content {
    flex: 1;
    margin-left: 250px; /* match sidebar width */
    display: flex;
    flex-direction: column;
  }
  .content-wrapper {
    padding: 2rem;
    flex: 1;
    background-color: #f7fafc;
  }
  </style>
  