<template>
  <AuthenticatedLayout>
    <div class="profile-page">
      <h1 class="page-title">My Profile</h1>
      <div v-if="loading">Loading...</div>
      <div v-else-if="!profile">No profile data.</div>
      <div v-else>
        <p>Email: {{ profile.email }}</p>
        <p>First Name: {{ profile.firstName }}</p>
        <p>Last Name: {{ profile.lastName }}</p>
        <!-- Possibly an edit form -->
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script>
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
import UserService from '@/services/user.service';

export default {
  name: 'Profile',
  components: { AuthenticatedLayout },
  data() {
    return {
      profile: null,
      loading: true
    };
  },
  async mounted() {
    try {
      this.loading = true;
      const response = await UserService.getProfile();
      this.profile = response.data;
    } catch {
      // handle error
    } finally {
      this.loading = false;
    }
  }
};
</script>
