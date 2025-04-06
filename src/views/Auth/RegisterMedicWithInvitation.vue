<template>
    <div class="register-container">
      <div class="register-card">
        <h1>Register as Medic</h1>
  
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label>First Name</label>
            <input v-model="userData.firstName" type="text" required />
          </div>
  
          <div class="form-group">
            <label>Last Name</label>
            <input v-model="userData.lastName" type="text" required />
          </div>
  
          <div class="form-group">
            <label>Email</label>
            <input v-model="userData.email" type="email" required />
          </div>
  
          <div class="form-group">
            <label>Phone</label>
            <input v-model="userData.phone" type="tel" required />
          </div>
  
          <div class="form-group">
            <label>Password</label>
            <input v-model="userData.password" type="password" required />
          </div>
  
          <!-- You may add extra medic-specific fields here if needed -->
  
          <div class="error-message" v-if="authError">
            {{ authError }}
          </div>
  
          <button type="submit" :disabled="authLoading">
            {{ authLoading ? 'Registering...' : 'Register' }}
          </button>
        </form>
  
        <p>
          Already have an account?
          <router-link to="/login">Login</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RegisterMedic',
    data() {
      return {
        userData: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: ''
        }
      };
    },
    computed: {
      // Explicitly access store state
      authLoading() {
        return this.$store.state.auth.loading;
      },
      authError() {
        return this.$store.state.auth.error;
      }
    },
    methods: {
      async handleRegister() {
        // Extract token from the route parameters (or query if you prefer)
        const token = this.$route.params.token;
        if (!token) {
          // If no token is provided, show an error
          this.$store.commit('auth/SET_ERROR', 'Invitation token is missing.');
          return;
        }
        // Dispatch the action for medic registration with invitation
        const success = await this.$store.dispatch('auth/registerMedicWithInvitation', {
          userData: this.userData,
          token: token
        });
        if (success) {
          this.$router.push('/login');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f7fa;
    padding: 2rem 0;
  }
  
  .register-card {
    width: 500px;
    padding: 2rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a5568;
    font-weight: 500;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .error-message {
    color: #e53e3e;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  button {
    padding: 0.75rem;
    background-color: #3182ce;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    width: 100%;
  }
  
  button:hover {
    background-color: #2c5282;
  }
  
  button:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
  
  p {
    text-align: center;
    color: #4a5568;
    margin-top: 1.5rem;
  }
  
  p a {
    color: #3182ce;
    text-decoration: none;
  }
  </style>
  