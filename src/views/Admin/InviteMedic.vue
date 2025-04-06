<!-- src/views/Admin/InviteMedic.vue -->
<template>
    <AuthenticatedLayout>
      <div class="invite-medic-page">
        <div class="page-header">
          <h1 class="page-title">Invite New Medic</h1>
          <button class="back-button" @click="navigateBack">
            <i class="fas fa-arrow-left"></i> Back to Medic Management
          </button>
        </div>
        <div class="invite-container">
          <div class="form-section">
            <h2 class="section-title">Medic Information</h2>
            <p class="section-description">
              Enter the details of the medic you'd like to invite.
            </p>
            <form @submit.prevent="submitInvitation" class="invite-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">Invitee First Name *</label>
                  <input 
                    id="firstName"
                    v-model="form.firstName"
                    type="text"
                    required
                    class="form-input"
                    :class="{ 'input-error': errors.firstName }"
                  />
                  <p v-if="errors.firstName" class="error-message">{{ errors.firstName }}</p>
                </div>
                <div class="form-group">
                  <label for="lastName">Invitee Last Name *</label>
                  <input 
                    id="lastName"
                    v-model="form.lastName"
                    type="text"
                    required
                    class="form-input"
                    :class="{ 'input-error': errors.lastName }"
                  />
                  <p v-if="errors.lastName" class="error-message">{{ errors.lastName }}</p>
                </div>
              </div>
              <div class="form-group">
                <label for="email">Email Address *</label>
                <input 
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="form-input"
                  :class="{ 'input-error': errors.email }"
                />
                <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
              </div>
              <div class="form-group">
                <label for="specialization">Specialization</label>
                <select 
                  id="specialization"
                  v-model="form.specialization"
                  class="form-input"
                >
                  <option value="">Select a specialization</option>
                  <option value="physiotherapy">Physiotherapy</option>
                  <option value="sports_medicine">Sports Medicine</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="rehabilitation">Rehabilitation</option>
                  <option value="neurology">Neurology</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="geriatrics">Geriatrics</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div v-if="form.specialization === 'other'" class="form-group">
                <label for="otherSpecialization">Please Specify</label>
                <input 
                  id="otherSpecialization"
                  v-model="form.otherSpecialization"
                  type="text"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="personalMessage">Personalized Message (Optional)</label>
                <textarea 
                  id="personalMessage"
                  v-model="form.personalMessage"
                  class="form-textarea"
                  placeholder="Add a personal message..."
                  rows="4"
                ></textarea>
              </div>
              <div class="form-actions">
                <button type="button" class="cancel-button" @click="navigateBack">
                  Cancel
                </button>
                <button type="submit" class="submit-button" :disabled="isSubmitting">
                  <span v-if="isSubmitting">
                    <i class="fas fa-spinner fa-spin"></i> Sending Invitation...
                  </span>
                  <span v-else>
                    <i class="fas fa-paper-plane"></i> Send Invitation
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div class="preview-section">
            <h2 class="section-title">Invitation Preview</h2>
            <div class="email-preview">
              <div class="email-header">
                <img src="@/assets/logo.png" alt="Kineto Logo" class="email-logo" />
                <h3 class="email-title">Invitation to Join Kineto</h3>
              </div>
              <div class="email-body">
                <p>Hello {{ form.firstName || 'Dr.' }},</p>
                <p>
                  You've been invited by the admin to join Kineto as a medic. Please use the following link to create your account.
                </p>
                <p v-if="form.personalMessage">
                  <strong>Message from the Admin:</strong><br>
                  "{{ form.personalMessage }}"
                </p>
                <div class="email-cta">
                  <button class="cta-button" disabled>
                    Accept Invitation
                  </button>
                </div>
                <p class="email-note">
                  This invitation will expire in 7 days. If you have any questions, please contact the administrator.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  </template>
  
  <script>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
  import AdminService from '@/services/admin.service';
  
  export default {
    name: 'InviteMedic',
    components: {
      AuthenticatedLayout
    },
    setup() {
      const router = useRouter();
      const isSubmitting = ref(false);
      const errors = reactive({});
      const form = reactive({
        email: '',
        firstName: '',
        lastName: '',
        specialization: '',
        otherSpecialization: '',
        personalMessage: ''
      });
  
      const validateForm = () => {
        errors.firstName = (!form.firstName || form.firstName.trim() === '') ? 'First name is required' : null;
        errors.lastName = (!form.lastName || form.lastName.trim() === '') ? 'Last name is required' : null;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email || form.email.trim() === '') {
          errors.email = 'Email is required';
        } else if (!emailRegex.test(form.email)) {
          errors.email = 'Please enter a valid email address';
        } else {
          errors.email = null;
        }
        return !errors.firstName && !errors.lastName && !errors.email;
      };
  
      const submitInvitation = async () => {
        if (!validateForm()) {
          return;
        }
        isSubmitting.value = true;
        try {
          const response = await AdminService.sendMedicInvitation(form);
          alert(response.data.message || 'Invitation sent successfully!');
          router.push('/admin/medics');
        } catch (error) {
          console.error('Failed to send invitation:', error);
          alert('Failed to send invitation. Please try again.');
        } finally {
          isSubmitting.value = false;
        }
      };
  
      const navigateBack = () => {
        router.push('/admin/medics');
      };
  
      return {
        form,
        errors,
        isSubmitting,
        submitInvitation,
        navigateBack
      };
    }
  };
  </script>
    
  <style scoped>
  .invite-medic-page {
    height: 100%;
  }
  
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .page-title {
    font-size: 1.75rem;
    color: #2d3748;
    margin: 0;
  }
  
  .back-button {
    display: flex;
    align-items: center;
    background-color: #edf2f7;
    color: #4a5568;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .back-button:hover {
    background-color: #e2e8f0;
  }
  
  .back-button i {
    margin-right: 0.5rem;
  }
  
  .invite-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  @media (max-width: 1024px) {
    .invite-container {
      grid-template-columns: 1fr;
    }
  }
  
  .form-section, .preview-section {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
  }
  
  .section-title {
    font-size: 1.25rem;
    color: #2d3748;
    margin: 0 0 0.5rem 0;
  }
  
  .section-description {
    color: #718096;
    margin-bottom: 1.5rem;
  }
  
  .invite-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  
  @media (max-width: 640px) {
    .form-row {
      grid-template-columns: 1fr;
    }
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .form-group label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #4a5568;
    margin-bottom: 0.25rem;
  }
  
  .form-input, .form-textarea {
    padding: 0.625rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    transition: border-color 0.2s;
  }
  
  .form-input:focus, .form-textarea:focus {
    outline: none;
    border-color: #3182ce;
  }
  
  .input-error {
    border-color: #e53e3e !important;
  }
  
  .error-message {
    color: #e53e3e;
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }
  
  .permissions-section {
    margin-top: 1rem;
    border-top: 1px solid #e2e8f0;
    padding-top: 1rem;
  }
  
  .subsection-title {
    font-size: 1rem;
    color: #2d3748;
    margin: 0 0 0.25rem 0;
  }
  
  .subsection-description {
    color: #718096;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }
  
  .permissions-checkboxes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.5rem;
  }
  
  .checkbox-group {
    display: flex;
    align-items: center;
  }
  
  .checkbox-group input[type="checkbox"] {
    margin-right: 0.5rem;
  }
  
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
    justify-content: flex-end;
  }
  
  .cancel-button {
    padding: 0.75rem 1.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    background-color: white;
    color: #4a5568;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .cancel-button:hover {
    background-color: #f7fafc;
  }
  
  .submit-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.375rem;
    background-color: #3182ce;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    min-width: 150px;
  }
  
  .submit-button:hover:not(:disabled) {
    background-color: #2c5282;
  }
  
  .submit-button:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
  
  .submit-button i {
    margin-right: 0.5rem;
  }
  
  /* Email Preview Styles */
  .email-preview {
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .email-header {
    background-color: #f7fafc;
    padding: 1rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .email-logo {
    height: 30px;
    width: auto;
    margin-right: 0.75rem;
  }
  
  .email-title {
    margin: 0;
    font-size: 1.125rem;
    color: #2d3748;
  }
  
  .email-body {
    padding: 1.5rem;
    background-color: white;
  }
  
  .email-body p {
    margin: 0 0 1rem 0;
    line-height: 1.5;
    color: #4a5568;
  }
  
  .email-cta {
    text-align: center;
    margin: 1.5rem 0;
  }
  
  .cta-button {
    background-color: #3182ce;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: not-allowed;
  }
  
  .email-note {
    font-size: 0.75rem;
    color: #718096;
    font-style: italic;
  }
  </style>