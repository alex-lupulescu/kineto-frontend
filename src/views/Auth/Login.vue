<template>
    <div class="login-container">
      <div class="login-card">
        <h1>Login</h1>
  
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label>Email</label>
            <input v-model="credentials.email" type="email" required />
          </div>
  
          <div class="form-group">
            <label>Password</label>
            <input v-model="credentials.password" type="password" required />
          </div>
  
          <div class="error-message" v-if="authError">{{ authError }}</div>
  
          <button type="submit" :disabled="authLoading">
            {{ authLoading ? 'Logging in...' : 'Login' }}
          </button>
        </form>
  
        <p>
          Don't have an account?
          <router-link to="/register">Register</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginView',
    data() {
      return {
        credentials: {
          email: '',
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
      async handleLogin() {
        const success = await this.$store.dispatch('auth/login', this.credentials);
        if (success) {
          // Optionally fetch user data
          await this.$store.dispatch('auth/fetchCurrentUser');
          // Navigate based on role
          const user = this.$store.state.auth.user;
          if (user && user.role === 'ADMIN') {
            this.$router.push('/admin/dashboard');
          } else if (user && user.role === 'MEDIC') {
            this.$router.push('/medic/dashboard');
          } else {
            this.$router.push('/user/dashboard');
          }
        }
      }
    }
  };
  </script>  
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f7fa;
  }
  
  .login-card {
    width: 400px;
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
  
  .login-form {
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
  
  .error-message {
    color: #e53e3e;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .login-button {
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
  
  .login-button:hover {
    background-color: #2c5282;
  }
  
  .login-button:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
  
  .register-link {
    margin-top: 1.5rem;
    text-align: center;
    color: #4a5568;
  }
  
  .register-link a {
    color: #3182ce;
    text-decoration: none;
  }
  </style>