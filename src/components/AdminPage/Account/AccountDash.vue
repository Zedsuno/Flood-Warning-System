<template>
    <div class="dashboard-container">
      <div class="dashboard-content">
        <div class="dashboard-header">
          <div class="dashboard-user-info">
            <div class="user-avatar">
              <div aria-label="Attidmese BUNSUA" class="user-initials">A</div>
            </div>
            <div class="user-title-box">
              <h3 class="user-subtitle">User</h3>
              <h1 class="user-title">Attidmese BUNSUA</h1>
            </div>
            <div class="dashboard-actions">
              <button type="button" class="delete-account-btn">Delete Account</button>
            </div>
            <div class="dashboard-save">
              <button aria-disabled="false" type="button" class="save-settings-btn">
                Save Settings
              </button>
            </div>
          </div>
        </div>
        <div class="dashboard-divider"></div>
        <AccountCard/>
      </div>
    </div>
  </template>
  
  <script>
  import AccountCard from "../Account/AccountCard";
  export default {
    components: {
      AccountCard,
    },
  }
  </script>
  
  <style scoped>
  .dashboard-container {
    background-color: whitesmoke;
    flex-grow: 1;
    z-index: 1;
    min-height: 100vh;
  }
  
  .dashboard-content {
    padding: 32px;
  }
  
  .dashboard-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  
  .dashboard-user-info {
    display: flex;
    align-items: center;
  }
  
  .user-avatar {
    display: inline-flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 4rem;
    height: 4rem;
    background-color: #D9E6F6;
    color: #4A5568;
    margin-right: 16px;
  }
  
  .user-initials {
    text-align: center;
    text-transform: uppercase;
    font-weight: 500;
  }
  
  .user-subtitle {
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: #4A5568;
    margin-bottom: 4px;
  }
  
  .user-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1.75rem;
    line-height: 1;
    font-weight: 700;
    color: #2D3748;
  }
  
  .dashboard-actions,
  .dashboard-save {
    display: flex;
    align-items: center;
  }
  
  .delete-account-btn {
    border-radius: 22px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 150ms ease;
    user-select: none;
    position: relative;
    white-space: nowrap;
    vertical-align: middle;
    line-height: normal;
    outline: none;
    height: 2.5rem;
    min-width: 2.5rem;
    font-size: 0.875rem;
    padding: 0 1.5rem;
    background-color: #E53E3E;
    border: 2px solid transparent;
    color: #FFF5F5;
    cursor: pointer;
    margin-right: 1rem;
  }
  
  .save-settings-btn {
    border-radius: 22px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 150ms ease;
    user-select: none;
    position: relative;
    white-space: nowrap;
    vertical-align: middle;
    line-height: normal;
    outline: none;
    height: 2.5rem;
    min-width: 2.5rem;
    font-size: 0.875rem;
    padding: 0 1.5rem;
    background-color: #11abcd;
    border: 2px solid transparent;
    color: #FFF5F5;
    cursor: pointer;
  }
  
  .dashboard-divider {
    height: 2px;
    background-color: #E2E8F0;
    margin-bottom: 16px;
  }
  </style>