// src/store/modules/medic.js
import MedicService from '@/services/medic.service';

export default {
  namespaced: true,

  state: {
    patients: [],
    appointments: [],
    stats: {},
    loading: false,
    error: null
  },

  getters: {
    patients: (state) => state.patients,
    appointments: (state) => state.appointments,
    stats: (state) => state.stats,
    loading: (state) => state.loading,
    error: (state) => state.error
  },

  mutations: {
    SET_PATIENTS(state, patients) {
      state.patients = patients;
    },
    SET_APPOINTMENTS(state, appointments) {
      state.appointments = appointments;
    },
    SET_STATS(state, stats) {
      state.stats = stats;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },

  actions: {
    async fetchPatients({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await MedicService.getMyPatients();
        commit('SET_PATIENTS', response.data);
      } catch (err) {
        commit('SET_ERROR', err.response?.data?.message || 'Failed to fetch patients');
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async fetchAppointments({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await MedicService.getAllAppointments();
        commit('SET_APPOINTMENTS', response.data);
      } catch (err) {
        commit('SET_ERROR', err.response?.data?.message || 'Failed to fetch appointments');
      } finally {
        commit('SET_LOADING', false);
      }
    }
  }
};
