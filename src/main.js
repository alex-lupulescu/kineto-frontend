import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import ApiService from './services/api.service';

// Initialize the API service with your base URL
ApiService.init(process.env.VUE_APP_API_URL || 'http://localhost:8081/api');

const app = createApp(App);

app.use(store);
app.use(router);

// If a token exists, fetch the current user profile
if (localStorage.getItem('token')) {
  store.dispatch('auth/fetchCurrentUser');
}

app.mount('#app');
