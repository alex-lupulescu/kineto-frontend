<template>
    <div class="register-container">
      <div class="register-card">
        <h1>Register</h1>
  
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
  
          <div class="error-message" v-if="authError">{{ authError }}</div>
  
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
    name: 'RegisterView',
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
      authLoading() {
        return this.$store.state.auth.loading;
      },
      authError() {
        return this.$store.state.auth.error;
      }
    },
    methods: {
      async handleRegister() {
        const success = await this.$store.dispatch('auth/register', this.userData);
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
  
  .app-title {
    font-size: 2rem;
    color: #3182ce;
    margin-bottom: 0.5rem;
    text-align: center;
  }
  
  .app-subtitle {
    text-align: center;
    color: #718096;
    margin-bottom: 2rem;
  }
  
  .register-form {
    display: flex;
    flex-direction: column;
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
  
  .field-error {
    color: #e53e3e;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
  
  .error-message {
    color: #e53e3e;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .register-button {
    padding: 0.75rem;
    background-color: #3182ce;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .register-button:hover {
    background-color: #2c5282;
  }
  
  .register-button:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
  
  .login-link {
    margin-top: 1.5rem;
    text-align: center;
    color: #4a5568;
  }
  
  .login-link a {
    color: #3182ce;
    text-decoration: none;
  }
  </style>