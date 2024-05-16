<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" >
    <div class="container-fluid">
      <a class="navbar-brand custom-brand" href="#">
        <img  src="@/assets/Logo/Logo (Replace).png"  
          width="30" 
          height="24" 
          class="d-inline-block align-text-top"
          alt="Logo"
        >
        เตือนภัยน้ำท่วม
      </a>
      <!-- Navbar toggle for responsive -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarContent">
        <!-- Place other navbar items here if needed -->
        <!-- ... -->
        <!-- User profile dropdown -->
        <ul class="navbar-nav ms-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img class="rounded-circle" src="@/assets/Logo/avatar.png" alt="Guest avatar" width="30" height="30"> ADMIN
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#/help">ช่วยเหลือ</a></li>
              <li>
  <router-link class="dropdown-item" to="/login">เข้าสู่ระบบ</router-link>
</li>            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TopBar',
  methods: {
    // Your methods here
  }
};
</script>

<style>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1030;
}

.custom-navbar {
  padding-top: 15px; /* Increase padding to increase height */
  padding-bottom: 15px; /* Increase padding to increase height */
}

/* Adjust the image and brand name size as needed */
.custom-brand img {
  height: 40px; /* New height for the logo */
  width: auto;
  margin-right: 10px; /* Adjust width automatically */
}

.custom-brand {
  font-size: 1.5rem; /* Increase font size for brand name */
  display: flex;
  align-items: center;
  margin-left: 10px; /* Align logo and text vertically */
}

/* Adjust the size and margin of the avatar in the dropdown */
.navbar-nav .nav-item .nav-link .rounded-circle {
  width: 40px; /* New width for the avatar */
  height: 40px; /* New height for the avatar */
  margin-right: 10px; /* Add some space between avatar and text */
}
@media (min-width: 992px) {
  /* This matches Bootstrap's lg breakpoint */
  .navbar  .dropdown:hover .dropdown-menu,
  .navbar  .dropdown .dropdown-menu:hover {
    display: block;
  }
}

</style>