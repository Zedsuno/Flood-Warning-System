<template>
  <div class="notification" v-if="show" :class="type">
    {{ message }}
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';
import { EventBus } from '../event-bus'; // Adjust the path as necessary

export default {
  setup() {
    const show = ref(false);
    const message = ref('');
    const type = ref('');

    const showNotification = (data) => {
      message.value = data.message;
      type.value = data.type;
      show.value = true;

      setTimeout(() => show.value = false, 3000); // Hide after 3 seconds
    };

    onMounted(() => EventBus.on('notify', showNotification));
    onUnmounted(() => EventBus.off('notify', showNotification));

    return { show, message, type };
  }
};
</script>
  
  <style scoped>
  .notification {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    animation: slide-in 0.5s;
  }
  
  .notification.success {
    background-color: #48c774; /* Success color */
  }
  
  .notification.error {
    background-color: #f14668; /* Error color */
  }
  
  @keyframes slide-in {
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 20px;
      opacity: 1;
    }
  }
  </style>