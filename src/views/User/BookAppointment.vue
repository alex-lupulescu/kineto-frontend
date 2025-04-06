<template>
    <AuthenticatedLayout>
      <div class="book-appointment">
        <h1 class="page-title">Book Appointment</h1>
        <!-- Date selection -->
        <div class="calendar">
          <label for="appointment-date">Select Date:</label>
          <input 
            id="appointment-date" 
            type="date" 
            v-model="selectedDate" 
            @change="fetchAvailability" 
            required
          />
        </div>
        <!-- Loading indicator -->
        <div v-if="loading" class="loading">
          Loading available times...
        </div>
        <!-- Time slots -->
        <div v-else>
          <div v-if="availability.length === 0">
            No available time slots for this date.
          </div>
          <div v-else class="time-slots">
            <div 
              v-for="(slot, index) in availability" 
              :key="index"
              class="time-slot"
              :class="{ selected: selectedSlot && selectedSlot.startTime === slot.startTime }"
              @click="selectSlot(slot)"
            >
              {{ formatTime(slot.startTime) }} - {{ formatTime(slot.endTime) }}
            </div>
          </div>
          <!-- Book button -->
          <button @click="book" :disabled="!selectedSlot || booking">
            {{ booking ? 'Booking...' : 'Book Appointment' }}
          </button>
        </div>
      </div>
    </AuthenticatedLayout>
  </template>
  
  <script>
  import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
  import AppointmentService from '@/services/appointment.service';
  
  export default {
    name: 'BookAppointment',
    components: { AuthenticatedLayout },
    data() {
      return {
        // We assume that the medic is predetermined (e.g., the user’s assigned medic)
        // For demo, we hardcode medicId = 2
        medicId: 2,
        selectedDate: '', // Format: "YYYY-MM-DD"
        availability: [],
        selectedSlot: null,
        loading: false,
        booking: false
      };
    },
    methods: {
      // Simple formatter (if you need more formatting, you can use Intl.DateTimeFormat)
      formatTime(time) {
        return time;
      },
      async fetchAvailability() {
        if (!this.selectedDate) return;
        this.loading = true;
        try {
          const response = await AppointmentService.getMedicAvailability(this.medicId, this.selectedDate);
          // Assume response.data is an array of { startTime, endTime } objects (LocalTime strings like "09:00")
          this.availability = response.data;
        } catch (error) {
          console.error('Failed to fetch availability:', error);
        } finally {
          this.loading = false;
        }
      },
      selectSlot(slot) {
        this.selectedSlot = slot;
      },
      async book() {
        if (!this.selectedDate || !this.selectedSlot) return;
        this.booking = true;
        try {
          // Prepare payload (convert selectedDate to LocalDate; here we assume the format is acceptable)
          const payload = {
            medicId: this.medicId,
            appointmentDate: this.selectedDate,
            startTime: this.selectedSlot.startTime,
            endTime: this.selectedSlot.endTime,
            notes: "" // Optionally add notes
          };
          await AppointmentService.scheduleAppointment(payload);
          alert('Appointment booked successfully!');
          this.$router.push('/user/appointments');
        } catch (error) {
          console.error('Booking failed:', error);
          alert('Booking failed.');
        } finally {
          this.booking = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .book-appointment {
    padding: 2rem;
  }
  .page-title {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
  .calendar {
    margin-bottom: 1rem;
  }
  .loading {
    font-size: 1rem;
    color: #718096;
    margin-bottom: 1rem;
  }
  .time-slots {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .time-slot {
    padding: 0.75rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    cursor: pointer;
  }
  .time-slot.selected {
    background-color: #3182ce;
    color: white;
    border-color: #3182ce;
  }
  button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    background-color: #48bb78;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  button:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
  </style>
  