<template>
  <div class="dashboard-container">
    <div class="dashboard-content">
      <div class="dashboard-header">
        <div class="dashboard-user-info">
          <div class="user-avatar">
            <div aria-label="Attidmese BUNSUA" class="user-initials">A</div>
          </div>
          <div class="user-title-box">
            <h1 class="user-title">{{ userData.username }}</h1>
          </div>
        </div>
        <div class="dashboard-actions">
          <button type="button" class="save-settings-btn">บันทึกการตั้งค่า</button>
          <button
            @click="showDeleteConfirmation"
            type="button"
            aria-label="Delete Station"
            class="css-1r8mp7n"
          >
            <svg
              viewBox="0 0 24 24"
              focusable="false"
              role="presentation"
              class="css-19a9efo"
            >
              <g fill="currentColor">
                <path
                  d="M19.452,7.5H4.547a.5.5,0,0,0-.5.545L5.334,22.181A2,2,0,0,0,7.326,24h9.347a2,2,0,0,0,1.992-1.819L19.95,8.045a.5.5,0,0,0-.129-.382A.5.5,0,0,0,19.452,7.5Zm-9.2,13a.75.75,0,0,1-1.5,0v-9a.75.75,0,0,1,1.5,0Zm5,0a.75.75,0,0,1-1.5,0v-9a.75.75,0,0,1,1.5,0Z"
                ></path>
                <path
                  d="M22,4H17.25A.25.25,0,0,1,17,3.75V2.5A2.5,2.5,0,0,0,14.5,0h-5A2.5,2.5,0,0,0,7,2.5V3.75A.25.25,0,0,1,6.75,4H2A1,1,0,0,0,2,6H22a1,1,0,0,0,0-2ZM9,3.75V2.5A.5.5,0,0,1,9.5,2h5a.5.5,0,0,1,.5.5V3.75a.25.25,0,0,1-.25.25H9.25A.25.25,0,0,1,9,3.75Z"
                ></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
      <div class="Space-Btw "></div>
      <AccountCard />
    </div>
  </div>
</template>

<script>
import AccountCard from "../Account/AccountCard.vue";
import axios from 'axios'; // Make sure to install axios via npm

export default {
  components: {
    AccountCard,
  },
  data() {
    return {
      userData: {
        username: '',
        email: '',
        password: '',
      },
    };
  },
  computed: {
    userInitials() {
      return this.userData.username ? this.userData.username.charAt(0) : 'U';
    },
  },
  methods: {
    getUserData() {
      // Replace '/api/user' with your actual API endpoint
      axios.get('/api/user')
        .then(response => {
          this.userData = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the user data:', error);
        });
    },
    saveSettings() {
      // Implement the save settings logic here
    },
    deleteUser() {
      // Implement the delete user logic here
    }
  },
  mounted() {
    this.getUserData();
  }
};
</script>

<style scoped>
.dashboard-container {
  background-color: var(--color-background);
  flex-grow: 1;
  z-index: 1;
  min-height: 100vh;
}

.dashboard-content {
  padding: 32px;
}

.dashboard-header {
  display: flex;
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
  background-color: #2d3748; /* Dark blue background */
  color: white; /* White text */
  margin-right: 16px;
}

.user-initials {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2rem;
}

.user-title-box {
  display: flex;
  flex-direction: column;
}

.user-subtitle {
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  color: #4a5568;
  margin-bottom: 0.25rem;
}

.user-title {
  font-size: 2.25rem;
  color: #1a202c;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dashboard-actions {
  display: flex;
  align-items: center;
}

.save-settings-btn {
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
}

.css-1r8mp7n {
  border-radius: 9999px;
  font-weight: 700;
  width: 44px;
  display: inline-flex;
  appearance: none;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  transition: all 150ms ease 0s;
  user-select: none;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  line-height: normal;
  outline: none;
  height: 44px;
  min-width: 2.5rem;
  font-size: 0.875rem;
  padding-left: 0px;
  padding-right: 0px;
  background-color: rgb(40, 43, 46);
  border: 2px solid transparent;
  color: rgb(250, 251, 253);
  font-family: 'Prompt', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin-left: 16px;
}

.css-1r8mp7n:hover {
  background-color: #ff4d4d; /* red background */
  color: white; /* white text */
  transform: translateY(-2px); /* Slightly raise the button on hover */
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
}
.css-19a9efo:not(:root) {
  overflow: hidden;
}
.css-19a9efo {
  width: 18px;
  height: 18px;
  color: currentcolor;
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
  backface-visibility: hidden;
}
.save-settings-btn:hover{
  background-color: #0f9cb7;
  transform: translateY(-2px); /* Slightly raise the button on hover */
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
}
.save-settings-btn {
  border-radius: 9999px;
  font-weight: 700;
  display: inline-flex;
  appearance: none;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  transition: all 150ms ease 0s;
  user-select: none;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  line-height: normal;
  outline: none;
  height: 2.5rem;
  min-width: 2.5rem;
  font-size: 0.875rem;
  padding-left: 32px;
  padding-right: 32px;
  background-image: linear-gradient(to right, #11abcd, #25adfc); 
  border: 2px solid transparent;
  color: rgb(250, 251, 253);
  font-family: 'Prompt', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
}

.save-settings-btn:hover {
  opacity: 0.85;
}

@media screen and (min-width: 62em) {
  .Space-Btw {
    margin-bottom: 32px;
  }
}
.Space-Btw {
  height: 2px;
  margin-top: 8px;
  margin-bottom: 16px;
  background-color: rgb(59, 63, 68);
}

.action-icon {
  fill: currentColor;
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

</style>