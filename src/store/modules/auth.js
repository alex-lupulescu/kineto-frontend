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
        // Optionally fetch user profile here...
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

    async registerMedicWithInvitation({ commit }, { userData, token }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        // Call the backend endpoint for medic registration with invitation.
        // This endpoint should be: POST /api/auth/signup/medic/invitation/{token}
        await AuthService.registerMedicWithInvitation(userData, token);
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

    async fetchCurrentUser({ commit, state }) {
      if (!state.token) return;
      commit('SET_LOADING', true);
      try {
        const response = await AuthService.getCurrentUserProfile();
        commit('SET_USER', response.data);
      } catch (err) {
        commit('SET_TOKEN', null);
        commit('SET_USER', null);
      } finally {
        commit('SET_LOADING', false);
      }
    }
  }
};
