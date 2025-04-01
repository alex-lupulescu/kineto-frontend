// src/store/index.js
import { createStore } from 'vuex';
import auth from './modules/auth';
import admin from './modules/admin';
import medic from './modules/medic';
import user from './modules/user';

export default createStore({
  modules: {
    auth,
    admin,
    medic,
    user
  }
});
