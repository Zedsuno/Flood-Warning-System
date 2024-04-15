@/assets/Logo/Logo (Replace).png"
<template>
  <div class="site ">
    <div class="header-nave">
      <div class="header-logo">
        <a href="#" class="logo-link">
          <img
            src="@/assets/Logo/Logo (Replace).png"
            width="30"
            height="24"
            class="logo-img d-inline-block align-text-top"
            alt="Logo"
          />
          เตือนภัยน้ำท่วม
        </a>
      </div>
      <div class="space"></div>

      <div class="navigation-admin">
        <!-- Placeholder for a decorative or functional block, adjust as needed -->
        <div class="textStation">
          <div class="bar-nave">
            <div style="width: 100%; height: 100%">
              <div class="green-nave"></div>
            </div>
          </div>

          <!-- Navigation items -->
          <div class="text-nave-station">
            <router-link
              to="/Admin"
              aria-current="page"
              class="text-router-station"
              previewlistener="true"
            >
              <p class="font-station">สถานี</p>
            </router-link>
          </div>
        </div>

        <div class="textAccount">
          <div class="bar-nave">
            <div style="width: 100%; height: 100%">
              <div class="green-nave"></div>
            </div>
          </div>

          <div class="text-nave-Account">
            <router-link
              to="/account"
              class="text-router-Account"
              previewlistener="true"
            >
              <p class="font-account">Account</p>
            </router-link>
          </div>
        </div>

        <!-- Add additional navigation items here -->
      </div>
    </div>

    <!-- Footer -->
    <div class="footer-admin">
      <div class="footer-router"></div>
      <router-link to="/"><a
        class="footerHome"
        previewlistener="true"
        ><p class="text-home">Home</p></a
      >
    </router-link>
    <button class="footer-logout" @click="logout">
      <p class="text-logout">ออกจากระบบ</p>
    </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar-AdminPage",
  methods: {
    logout() {
      // Clear the token from local storage
      localStorage.removeItem('token');

      // Redirect to the login page
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>

.header-logo{
  transition: all 0.15s ease-out 0s;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    display: block;
}

.site {
  width: 300px;
  position: fixed;
  height: 100%;
  background-color: whitesmoke;
  color: var(--jet); /* White text color */
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  -webkit-box-pack: justify;
  top: 0; /* Align to the top */
  left: 0; /* Align to the left */
  bottom: 0; /* Stretch to the bottom */
  z-index: 100; /* Adjust as needed, should be above the base content */
  /* Other styles */
}

.space {
  margin-top: 80px;
}

.header-nave {
  margin-bottom: 8px;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #111827;
  font-weight: 600;
  margin-bottom: 16px;
}

.logo-link:hover {
  color: var(--pacific-cyan); /* Hover color */
}

.bar-nave {
  position: absolute;
  top: 0px;
  bottom: 0px;
  overflow: hidden;
}
.green-nave {
  width: 6px;
  height: 100%;
  background-color: rgb(58, 186, 80);
}

.textStation {
  position: relative;
  margin-bottom: 16px;
}

.text-nave-station {
  margin-left: 12px;
}

.text-router-station {
  transition: all 0.15s ease-out 0s;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  display: block;
  padding-top: 8px;
  color: var(--jet);
  font-size: 1.875rem;
  font-weight: 700;
  padding-left: 4px;
  margin-top: 0px;
  margin-bottom: 0px;
}

.text-router-station:hover {
  color: var(--pacific-cyan);; /* Hover color */
}

.font-station {
  font-size: 1.875rem;
  margin: 0px;
}

.textAccount {
  position: relative;
  margin-bottom: 16px;
}

.text-nave-Account {
  margin-left: 12px;
}

.text-router-Account {
  transition: all 0.15s ease-out 0s;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  display: block;
  padding-top: 8px;
  color: var(--jet);
  font-size: 1.875rem;
  font-weight: 700;
  padding-left: 4px;
  margin-top: 0px;
  margin-bottom: 0px;
}

.text-router-Account:hover {
  color: var(--pacific-cyan);; /* Hover color */
}
.font-account {
  font-size: 1.875rem;
}
.logo-img {
  margin-right: 10px; /* Spacing between logo and text */
}

.navigation-admin {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  position: relative;
  margin-bottom: 16px;
}
.navigation-admin ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.navigation-admin ul li {
  margin-bottom: 15px;
}

.navigation-admin ul li a {
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
}

.navigation-admin ul li a:hover {
  color: #11abcd; /* Hover color */
}

.footer-admin {
  margin-left: 16px;
}

.footer-router {
  display: flex;
  flex-direction: column;
}

.footerHome {
  transition: all 0.15s ease-out 0s;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  display: inline-block;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  color: var(--jet);
}

.footerHome:hover{
  color: var(--pacific-cyan);
}
.text-home {
  font-family: Calibre, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0px;
  font-weight: 700;
  font-size: 1.125rem;
}

.text-home::after {
  display: block;
  content: "";
  border-bottom: 3px solid rgb(23, 25, 28);
  transform: scaleX(0);
  transition: transform 250ms cubic-bezier(0.785, 0.135, 0.15, 0.86) 0s;
  transform-origin: 0% 50%;
  width: inherit;
}
.text-support {
  font-family: Calibre, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0px;
  font-weight: 700;
  font-size: 1.125rem;
}

.text-support::after {
  display: block;
  content: "";
  border-bottom: 3px solid rgb(23, 25, 28);
  transform: scaleX(0);
  transition: transform 250ms cubic-bezier(0.785, 0.135, 0.15, 0.86) 0s;
  transform-origin: 0% 50%;
  width: inherit;
}

.footer-support {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.support-nave {
  transition: all 0.15s ease-out 0s;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  display: inline-block;
  margin-right: 8px;
  color: var(--jet);
}

.support-nave :hover{
  color: var(--pacific-cyan);
}

.footer-logout {
  color: var(--jet);
  text-decoration: none;
  transition: color 0.15s ease-out;
  cursor: pointer;
  outline: none;
  display: inline-flex;
  align-items: center;
  margin-top: 16px;
  background: none;
  border: none;
  padding: 0;
  text-align: left;
  display: block;
}

.footer-logout:hover {
  color: #11abcd
}

.text-logout {
  font-family: Calibre, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
  Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0px;
  font-weight: 700;
  font-size: 1.125rem;
}


.footer-admin a {
  color: var(--jet); 
    text-decoration: none;
  transition: color 0.3s ease;
}

.footer-admin a:hover {
  color: #11abcd; /* Hover color */
}
</style>
