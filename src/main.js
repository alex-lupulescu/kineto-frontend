// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ApiService from '@/services/api.service';

// Initialize the API
ApiService.init(process.env.VUE_APP_API_URL || 'http://localhost:8081/api');

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
