<template>
    <div class="admin-page">
      <Sidebar class="sidebar"/>
      <AccountDash class="main-content"/>
    </div>
  </template>
  
  <script>
  import Sidebar from '../components/AdminPage/Sidebar.vue';
  import AccountDash from '../components/AdminPage/Account/AccountDash.vue'
  export default {
    name: 'AdminPage',
    components: {
        Sidebar,
        AccountDash,
        // ... other components ...
      },
    // Add your component logic here
  }
  </script>
  
  <style scoped>
  .admin-page{
    display: flex;
      height: auto;
      flex-direction: row;
  }
  .sidebar {
    flex: 0 0 250px; /* Sidebar width - you can adjust this as necessary */
    z-index: 1000;
    
    /* Additional styles for your sidebar */
  }
  .main-content {
    flex-grow: 1;
    margin-left: 300px; 
    /* Additional styles for your main content */
  }
  
  /* Responsive layout adjustments */
  @media (max-width: 768px) {
    .admin-page {
      flex-direction: column;
    }
    .sidebar {
      flex: none; /* On small screens, let the sidebar take its natural height */
      width: 100%; /* Full width */
    }
    .main-content {
      width: 100%; /* Full width */
      flex-grow: 0; /* Don't grow */
    }
  }
  </style>
  