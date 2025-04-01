// src/store/modules/auth.js
import AuthService from '@/services/auth.service';

export default {
  namespaced: true,

  state: {
    token: localStorage.getItem('token') || null,
    user: null,
    loading: false,
    error: null
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
    token: (state) => state.token,
    loading: (state) => state.loading,
    error: (state) => state.error
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },

  actions: {
    async login({ commit }, credentials) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const response = await AuthService.login(credentials);
        const token = response.data.accessToken || response.data.token;
        commit('SET_TOKEN', token);

        // In a real backend, you might fetch the user profile after login:
        // e.g., commit('SET_USER', userProfileFromBackend);

        return true;
      } catch (err) {
        commit('SET_ERROR', err.response?.data?.message || 'Authentication failed');
        return false;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async register({ commit }, userData) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        await AuthService.register(userData);
        return true;
      } catch (err) {
        commit('SET_ERROR', err.response?.data?.message || 'Registration failed');
        return false;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    logout({ commit }) {
      commit('SET_TOKEN', null);
      commit('SET_USER', null);
    },

    // Example: fetch the current user profile after login
    async fetchCurrentUser({ commit, state }) {
      if (!state.token) return; // no token, skip
      commit('SET_LOADING', true);
      try {
        const response = await AuthService.getCurrentUserProfile();
        commit('SET_USER', response.data);
      } catch (err) {
        // If token is invalid or user not found
        commit('SET_TOKEN', null);
        commit('SET_USER', null);
      } finally {
        commit('SET_LOADING', false);
      }
    }
  }
};
