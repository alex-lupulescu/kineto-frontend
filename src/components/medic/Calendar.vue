<template>
    <div class="calendar-container">
      <!-- vue-cal component with configurable views -->
      <vue-cal
        v-model="selectedDate"
        :events="events"
        :on-event-click="onEventClick"
        :views="views"
        :time="true"
        :disable-views="['year']"
        @cell-click="onCellClick"
      />
    </div>
  </template>
  
  <script>
  import VueCal from 'vue-cal'
  import 'vue-cal/dist/vuecal.css' // Import vue-cal styles
  
  export default {
    name: 'VueCalComponent',
    components: { VueCal },
    data() {
      return {
        // This holds the currently selected date
        selectedDate: new Date(),
        // Example events, replace with backend data as needed
        events: [
          {
            title: 'Meeting with John',
            start: new Date().toISOString(),
            end: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString() // one hour later
          }
        ],
        // Define the available views
        views: ['month', 'week', 'day']
      }
    },
    methods: {
      onCellClick(cell) {
        // This is triggered when a user clicks on a cell (date) in the calendar.
        console.log('Cell clicked:', cell.date)
        // Here you can trigger an API call to fetch available intervals for the clicked date,
        // or open a modal to block out a time interval.
      },
      onEventClick(event) {
        // This is triggered when an event is clicked.
        console.log('Event clicked:', event)
      }
    }
  }
  </script>
  
  <style scoped>
  .calendar-container {
    padding: 1rem;
    background-color: #f5f7fa;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  </style>
  