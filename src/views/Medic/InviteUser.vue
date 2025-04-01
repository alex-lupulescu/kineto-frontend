<template>
    <AuthenticatedLayout>
      <div class="invite-user-page">
        <h1 class="page-title">Invite New Patient/User</h1>
        <form @submit.prevent="invite">
          <div class="form-group">
            <label>Email</label>
            <input v-model="form.email" type="email" required />
          </div>
          <div class="form-group">
            <label>Message (Optional)</label>
            <textarea v-model="form.message"></textarea>
          </div>
          <button type="submit" :disabled="loading">
            {{ loading ? 'Sending...' : 'Send Invitation' }}
          </button>
        </form>
      </div>
    </AuthenticatedLayout>
  </template>
  
  <script>
  import { mapActions, mapState } from 'vuex';
  import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
  import MedicService from '@/services/medic.service';
  
  export default {
    name: 'InviteUser',
    components: {
      AuthenticatedLayout
    },
    data() {
      return {
        form: {
          email: '',
          message: ''
        },
        loading: false
      };
    },
    computed: {
      ...mapState('auth', ['error'])
    },
    methods: {
      async invite() {
        try {
          this.loading = true;
          await MedicService.inviteUser(this.form);
          alert('Invitation sent');
          this.$router.push('/medic/patients');
        } catch (err) {
          alert('Failed to send invitation');
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>
  