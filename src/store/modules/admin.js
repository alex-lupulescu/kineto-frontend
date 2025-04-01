// src/store/modules/admin.js
import AdminService from '@/services/admin.service';

export default {
  namespaced: true,

  state: {
    medics: [],
    packages: [],
    loading: false,
    error: null
  },

  getters: {
    medics: (state) => state.medics,
    packages: (state) => state.packages,
    loading: (state) => state.loading,
    error: (state) => state.error
  },

  mutations: {
    SET_MEDICS(state, medics) {
      state.medics = medics;
    },
    SET_PACKAGES(state, packages) {
      state.packages = packages;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },

  actions: {
    async fetchMedics({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await AdminService.getAllMedics();
        commit('SET_MEDICS', response.data);
      } catch (err) {
        commit('SET_ERROR', err.response?.data?.message || 'Failed to fetch medics');
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async fetchPackages({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await AdminService.getAllPackages();
        commit('SET_PACKAGES', response.data);
      } catch (err) {
        commit('SET_ERROR', err.response?.data?.message || 'Failed to fetch packages');
      } finally {
        commit('SET_LOADING', false);
      }
    }
  }
};
