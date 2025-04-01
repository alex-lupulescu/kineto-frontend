<!-- src/components/admin/MedicActivityLog.vue -->
<template>
    <div class="activity-log">
      <h3 class="activity-title">Recent Activity</h3>
      
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading activity log...</p>
      </div>
      
      <div v-else-if="activities.length === 0" class="empty-state">
        <i class="fas fa-history empty-icon"></i>
        <p>No recent activity found for this medic.</p>
      </div>
      
      <div v-else class="activity-timeline">
        <div 
          v-for="(activity, index) in activities" 
          :key="index"
          class="activity-item"
        >
          <div class="activity-icon" :class="`activity-${activity.type}`">
            <i :class="getActivityIcon(activity.type)"></i>
          </div>
          
          <div class="activity-content">
            <div class="activity-header">
              <span class="activity-action">{{ activity.action }}</span>
              <span class="activity-date">{{ formatDate(activity.timestamp) }}</span>
            </div>
            <p class="activity-description">{{ activity.description }}</p>
            
            <div v-if="activity.details" class="activity-details">
              <div 
                v-for="(value, key) in activity.details" 
                :key="key"
                class="detail-item"
              >
                <span class="detail-label">{{ formatDetailKey(key) }}:</span>
                <span class="detail-value">{{ value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="activities.length > 0 && !loading" class="activity-footer">
        <button 
          v-if="hasMoreActivities"
          @click="loadMoreActivities" 
          class="load-more-button"
          :disabled="loadingMore"
        >
          <span v-if="loadingMore">
            <i class="fas fa-spinner fa-spin"></i> Loading...
          </span>
          <span v-else>
            Load More Activity
          </span>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  // Example: import MedicService from '@/services/medic.service';
  import { format } from 'date-fns';
  
  export default {
    name: 'MedicActivityLog',
    
    props: {
      medicId: {
        type: [Number, String],
        required: true
      }
    },
    
    setup(props) {
      const activities = ref([]);
      const loading = ref(true);
      const loadingMore = ref(false);
      const page = ref(1);
      const hasMoreActivities = ref(true);
      
      const fetchActivities = async (isLoadMore = false) => {
        if (isLoadMore) {
          loadingMore.value = true;
        } else {
          loading.value = true;
        }
        
        try {
          // In a real implementation, you'd do:
          // const response = await MedicService.getMedicActivity(props.medicId, { page: page.value, limit: 10 });
          // For now, we simulate:
          const fakeResponse = {
            data: {
              activities: [
                {
                  type: 'appointment',
                  action: 'Scheduled Appointment',
                  timestamp: new Date().toISOString(),
                  description: 'Created a new appointment for patient Alice Cooper',
                  details: { patient: 'Alice Cooper', date: '2023-06-20' }
                },
                {
                  type: 'login',
                  action: 'Login',
                  timestamp: new Date().toISOString(),
                  description: 'User logged in from IP 192.168.1.10'
                }
              ],
              hasMore: false
            }
          };
          
          if (isLoadMore) {
            activities.value = [...activities.value, ...fakeResponse.data.activities];
          } else {
            activities.value = fakeResponse.data.activities;
          }
          
          hasMoreActivities.value = fakeResponse.data.hasMore;
          if (isLoadMore) {
            page.value++;
          }
        } catch (error) {
          console.error('Failed to fetch medic activities', error);
        } finally {
          loading.value = false;
          loadingMore.value = false;
        }
      };
      
      const loadMoreActivities = () => {
        if (!hasMoreActivities.value || loadingMore.value) return;
        page.value++;
        fetchActivities(true);
      };
      
      const getActivityIcon = (type) => {
        const icons = {
          login: 'fas fa-sign-in-alt',
          logout: 'fas fa-sign-out-alt',
          appointment: 'fas fa-calendar-check',
          patient: 'fas fa-user',
          profile: 'fas fa-user-edit',
          system: 'fas fa-cog'
        };
        return icons[type] || 'fas fa-history';
      };
      
      const formatDate = (timestamp) => {
        return format(new Date(timestamp), 'MMM d, yyyy h:mm a');
      };
      
      const formatDetailKey = (key) => {
        return key
          .replace(/_/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());
      };
      
      onMounted(() => {
        fetchActivities();
      });
      
      return {
        activities,
        loading,
        loadingMore,
        hasMoreActivities,
        loadMoreActivities,
        getActivityIcon,
        formatDate,
        formatDetailKey
      };
    }
  };
  </script> 
  
  <style scoped>
  .activity-log {
    margin-top: 1.5rem;
  }
  
  .activity-title {
    font-size: 1.125rem;
    color: #2d3748;
    margin: 0 0 1rem 0;
  }
  
  /* Loading and Empty states */
  .loading-state, .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
    color: #a0aec0;
  }
  
  .loading-spinner {
    width: 30px;
    height: 30px;
    border: 3px solid #e2e8f0;
    border-top-color: #3182ce;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 0.5rem;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .empty-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  /* Activity Timeline */
  .activity-timeline {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .activity-item {
    display: flex;
    gap: 1rem;
  }
  
  .activity-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: white;
  }
  
  .activity-login {
    background-color: #4299e1;
  }
  
  .activity-logout {
    background-color: #a0aec0;
  }
  
  .activity-appointment {
    background-color: #48bb78;
  }
  
  .activity-patient {
    background-color: #ed8936;
  }
  
  .activity-profile {
    background-color: #9f7aea;
  }
  
  .activity-system {
    background-color: #718096;
  }
  
  .activity-content {
    flex: 1;
    background-color: #f7fafc;
    border-radius: 0.375rem;
    padding: 0.75rem 1rem;
  }
  
  .activity-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
  }
  
  .activity-action {
    font-weight: 600;
    color: #2d3748;
    font-size: 0.875rem;
  }
  
  .activity-date {
    font-size: 0.75rem;
    color: #718096;
  }
  
  .activity-description {
    font-size: 0.875rem;
    color: #4a5568;
    margin: 0 0 0.5rem 0;
  }
  
  .activity-details {
    background-color: white;
    border-radius: 0.25rem;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border: 1px solid #e2e8f0;
  }
  
  .detail-item {
    display: flex;
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }
  
  .detail-item:last-child {
    margin-bottom: 0;
  }
  
  .detail-label {
    font-weight: 600;
    color: #718096;
    margin-right: 0.5rem;
    width: 100px;
  }
  
  .detail-value {
    color: #4a5568;
  }
  
  .activity-footer {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }
  
  .load-more-button {
    background-color: transparent;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    color: #4a5568;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .load-more-button:hover:not(:disabled) {
    background-color: #f7fafc;
  }
  
  .load-more-button:disabled {
    color: #a0aec0;
    cursor: not-allowed;
  }
  </style>