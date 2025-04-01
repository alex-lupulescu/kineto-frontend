// src/services/api.service.js
import axios from 'axios';

const ApiService = {
  _client: null,

  init(baseURL) {
    this._client = axios.create({
      baseURL: baseURL || 'http://localhost:8080/api',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Request interceptor
    this._client.interceptors.request.use(
      (config) => {
        // If you store token in localStorage or in your store, retrieve it here:
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this._client.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle 401, 403, etc.
        if (error.response && error.response.status === 401) {
          // Possibly dispatch logout or show error
          // For example:
          // store.dispatch('auth/logout');
        }
        return Promise.reject(error);
      }
    );
  },

  get(resource, params) {
    return this._client.get(resource, { params });
  },

  post(resource, data) {
    return this._client.post(resource, data);
  },

  put(resource, data) {
    return this._client.put(resource, data);
  },

  patch(resource, data) {
    return this._client.patch(resource, data);
  },

  delete(resource) {
    return this._client.delete(resource);
  }
};

export default ApiService;
