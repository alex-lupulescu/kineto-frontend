<template>
    <AuthenticatedLayout>
      <div class="medic-calendar">
        <h1 class="page-title">Medic Calendar</h1>
        <!-- Vue Cal component -->
        <vue-cal
          ref="calendar"
          :selected-date="selectedDate"
          :view="view"
          @cell-click="handleCellClick"
          style="height: 600px;"
        />
        <!-- Options Modal: appears when a cell/interval is clicked -->
        <div v-if="showOptionsModal" class="modal-overlay">
          <div class="modal-container options-modal">
            <h3>Select Action</h3>
            <button @click="openConfirmModal('working-hours')" class="modal-option">
              Set Working Hours
            </button>
            <button @click="openConfirmModal('block-interval')" class="modal-option">
              Block Interval
            </button>
            <button @click="openConfirmModal('make-appointment')" class="modal-option">
              Make Appointment
            </button>
            <button @click="closeOptionsModal" class="modal-close">Cancel</button>
          </div>
        </div>
        <!-- Confirmation Modal: appears after an action is chosen -->
        <div v-if="showConfirmModal" class="modal-overlay">
          <div class="modal-container confirm-modal">
            <h3>{{ confirmTitle }}</h3>
            <form @submit.prevent="confirmAction">
              <div class="form-group">
                <label>Start Time</label>
                <input v-model="actionForm.startTime" type="time" required />
              </div>
              <div class="form-group">
                <label>End Time</label>
                <input v-model="actionForm.endTime" type="time" required />
              </div>
              <!-- Only show patient name field for appointments -->
              <div class="form-group" v-if="selectedAction === 'make-appointment'">
                <label>Patient Name</label>
                <input v-model="actionForm.patientName" type="text" required />
              </div>
              <div class="modal-actions">
                <button type="submit" class="submit-button">Confirm</button>
                <button type="button" @click="closeConfirmModal" class="cancel-button">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  </template>
  
  <script>
  import { ref } from 'vue';
  import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
  import VueCal from 'vue-cal';
  import 'vue-cal/dist/vuecal.css';
  
  export default {
    name: 'MedicCalendar',
    components: {
      AuthenticatedLayout,
      VueCal
    },
    setup() {
      // Calendar view and date
      const view = ref('timeGridWeek'); // you can change this to dayGridMonth, timeGridDay, etc.
      const selectedDate = ref(new Date());
      // Modal visibility states
      const showOptionsModal = ref(false);
      const showConfirmModal = ref(false);
      // The action chosen by the medic: 'working-hours', 'block-interval', or 'make-appointment'
      const selectedAction = ref(null);
      // Form to hold the interval details for the action
      const actionForm = ref({
        startTime: '',
        endTime: '',
        patientName: ''
      });
      // Title for the confirmation modal
      const confirmTitle = ref('');
  
      // When a cell/interval is clicked on the calendar
      const handleCellClick = (cell) => {
        // Here we assume cell.date is a string/date and cell.startTime, cell.endTime are provided or default them.
        const defaultStart = cell.startTime || '09:00';
        const defaultEnd = cell.endTime || '17:00';
        actionForm.value.startTime = defaultStart;
        actionForm.value.endTime = defaultEnd;
        // Update the selected date
        selectedDate.value = new Date(cell.date);
        // Open the options modal
        showOptionsModal.value = true;
      };
  
      const openConfirmModal = (action) => {
        selectedAction.value = action;
        if (action === 'working-hours') {
          confirmTitle.value = 'Set Working Hours';
        } else if (action === 'block-interval') {
          confirmTitle.value = 'Block Interval';
        } else if (action === 'make-appointment') {
          confirmTitle.value = 'Make Appointment';
        }
        // Close the options modal and open the confirmation modal
        showOptionsModal.value = false;
        showConfirmModal.value = true;
      };
  
      const closeOptionsModal = () => {
        showOptionsModal.value = false;
      };
  
      const closeConfirmModal = () => {
        showConfirmModal.value = false;
      };
  
      // Confirm action: here you would call your back‑end API based on the selected action.
      const confirmAction = () => {
        console.log('Action confirmed:', selectedAction.value, actionForm.value);
        // Example: call API based on selectedAction.value and actionForm.value.
        // e.g., if (selectedAction.value === 'working-hours') { API call... }
        // After the action, close the confirm modal and reset the form.
        showConfirmModal.value = false;
        actionForm.value = { startTime: '', endTime: '', patientName: '' };
      };
  
      return {
        view,
        selectedDate,
        showOptionsModal,
        showConfirmModal,
        selectedAction,
        actionForm,
        confirmTitle,
        handleCellClick,
        openConfirmModal,
        closeOptionsModal,
        closeConfirmModal,
        confirmAction
      };
    }
  };
  </script>
  
  <style scoped>
  .page-title {
    font-size: 1.75rem;
    color: #2d3748;
    margin-bottom: 1.5rem;
  }
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .modal-container {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
  }
  .options-modal h3,
  .confirm-modal h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #2d3748;
  }
  .modal-option {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    background-color: #3182ce;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
  }
  .modal-option:hover {
    background-color: #2c5282;
  }
  .modal-close {
    margin-top: 1rem;
    background-color: transparent;
    border: none;
    color: #718096;
    cursor: pointer;
  }
  .form-group {
    margin-bottom: 1rem;
  }
  input[type='time'],
  input[type='text'] {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
  }
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  .submit-button {
    background-color: #48bb78;
    color: white;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .cancel-button {
    background-color: #e2e8f0;
    color: #4a5568;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  