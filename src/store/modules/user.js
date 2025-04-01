// src/store/modules/user.js
import UserService from '@/services/user.service';

export default {
  namespaced: true,

  state: {
    profile: null,
    appointments: [],
    loading: false,
    error: null
  },

  getters: {
    profile: (state) => state.profile,
    appointments: (state) => state.appointments,
    loading: (state) => state.loading,
    error: (state) => state.error
  },

  mutations: {
    SET_PROFILE(state, profile) {
      state.profile = profile;
    },
    SET_APPOINTMENTS(state, appointments) {
      state.appointments = appointments;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },

  actions: {
    async fetchUserProfile({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await UserService.getUserProfile();
        commit('SET_PROFILE', response.data);
      } catch (err) {
        commit('SET_ERROR', err.response?.data?.message || 'Failed to fetch profile');
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async fetchUserAppointments({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await UserService.getUserAppointments();
        commit('SET_APPOINTMENTS', response.data);
      } catch (err) {
        commit('SET_ERROR', err.response?.data?.message || 'Failed to fetch appointments');
      } finally {
        commit('SET_LOADING', false);
      }
    }
  }
};
