// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

// Auth pages
import Login from '@/views/Auth/Login.vue';
import Register from '@/views/Auth/Register.vue';

// Admin
import AdminDashboard from '@/views/Admin/Dashboard.vue';
import MedicManagement from '@/views/Admin/MedicManagement.vue';
import InviteMedic from '@/views/Admin/InviteMedic.vue';
import Reports from '@/views/Admin/Reports.vue';

// Medic
import MedicDashboard from '@/views/Medic/Dashboard.vue';
import Patients from '@/views/Medic/Patients.vue';
import Schedule from '@/views/Medic/Schedule.vue';
import InviteUser from '@/views/Medic/InviteUser.vue';

// User
import UserDashboard from '@/views/User/Dashboard.vue';
import MyAppointments from '@/views/User/MyAppointments.vue';
import BookAppointment from '@/views/User/BookAppointment.vue';
import Profile from '@/views/User/Profile.vue';

const routes = [
  { path: '/', redirect: '/login' },

  { path: '/login', name: 'Login', component: Login, meta: { requiresAuth: false } },
  { path: '/register', name: 'Register', component: Register, meta: { requiresAuth: false } },

  // Admin
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'ADMIN' }
  },
  {
    path: '/admin/medics',
    name: 'MedicManagement',
    component: MedicManagement,
    meta: { requiresAuth: true, role: 'ADMIN' }
  },
  {
    path: '/admin/medics/invite',
    name: 'InviteMedic',
    component: InviteMedic,
    meta: { requiresAuth: true, role: 'ADMIN' }
  },
  {
    path: '/admin/reports',
    name: 'Reports',
    component: Reports,
    meta: { requiresAuth: true, role: 'ADMIN' }
  },

  // Medic
  {
    path: '/medic/dashboard',
    name: 'MedicDashboard',
    component: MedicDashboard,
    meta: { requiresAuth: true, role: 'MEDIC' }
  },
  {
    path: '/medic/patients',
    name: 'Patients',
    component: Patients,
    meta: { requiresAuth: true, role: 'MEDIC' }
  },
  {
    path: '/medic/schedule',
    name: 'Schedule',
    component: Schedule,
    meta: { requiresAuth: true, role: 'MEDIC' }
  },
  {
    path: '/medic/invite',
    name: 'InviteUser',
    component: InviteUser,
    meta: { requiresAuth: true, role: 'MEDIC' }
  },

  // User
  {
    path: '/user/dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true, role: 'USER' }
  },
  {
    path: '/user/appointments',
    name: 'MyAppointments',
    component: MyAppointments,
    meta: { requiresAuth: true, role: 'USER' }
  },
  {
    path: '/user/book',
    name: 'BookAppointment',
    component: BookAppointment,
    meta: { requiresAuth: true, role: 'USER' }
  },
  {
    path: '/user/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true, role: 'USER' }
  },

  { path: '/:pathMatch(.*)*', redirect: '/login' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const userIsAuth = store.getters['auth/isAuthenticated'];
  const userRole = store.state.auth.user ? store.state.auth.user.role : null;

  if (requiresAuth && !userIsAuth) {
    // not logged in
    return next('/login');
  }

  if (to.meta.role && to.meta.role !== userRole) {
    // wrong role -> redirect to your role-based dashboard
    switch (userRole) {
      case 'ADMIN':
        return next('/admin/dashboard');
      case 'MEDIC':
        return next('/medic/dashboard');
      case 'USER':
        return next('/user/dashboard');
      default:
        return next('/login');
    }
  }

  next();
});

export default router;
