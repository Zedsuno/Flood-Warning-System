<template>
  <nav class="navbar-secondary   navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <!-- Navbar brand or title can be placed here if needed -->
      <!-- <a class="navbar-brand" href="#">Navbar</a> -->

      <!-- Toggler/collapsible Button -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar links -->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" exact>
            <i class="fa fa-home"></i> หน้าแรก
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Map" class="nav-link" active-class="active">
            <i class="fa fa-map"></i> แผนที่
          </router-link>
        </li>
          <li class="nav-item">
            <router-link to="/Station" class="nav-link" active-class="active">
              <i class="fa fa-tower-cell"></i> สถานี
            </router-link> 
          </li>
          <li class="nav-item">
            <router-link to="/Riverview" class="nav-link" active-class="active">
              <i class="fa fa-water"></i> แหล่งน้ำ</router-link>
            </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa fa-database"></i> ข้อมูล
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link to="/FloodManage" class="dropdown-item" active-class="active">
                  การบริหารจัดการน้ำท่วม
                </router-link>
              </li>
              <li>
                <router-link to="/HisTory" class="dropdown-item" active-class="active">
                  ประวัติเหตุการณ์น้ำท่วม
                </router-link>
              </li>
              <li>
                <router-link to="/FloodBook" class="dropdown-item" active-class="active">
                  คู่มือสถานการณ์น้ำท่วม
                </router-link>
              </li>
              <li>
                <router-link to="/DefendFlood" class="dropdown-item" active-class="active">
                  วิธีป้องกันน้ำท่วม
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa fa-info-circle"></i> เกี่ยวกับ
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">เซนเซอร์</a></li>
              <li>
                <a class="dropdown-item" href="#">ประวัติสถานการณ์โดยรวม</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppNavbar",
  // ... your existing script code ...
};
</script>

<!-- Add any additional styles if needed -->
<style>
/* Adjust the value as needed */
.navbar-secondary  {
  position: sticky;
  top: 70.5px; /* Adjust if there is a top bar with a certain height, e.g., top: 50px; */
  z-index: 1020; /* Typically higher than other elements, but less than modal overlays */
}
/* Center align the nav items */
.navbar-nav {
  justify-content: center;
}
/* Increase size and add space between icon and text */
.navbar-secondary .nav-link {
  font-size: 1.25rem; /* Larger font size */
  padding: 10px 15px; /* Larger padding */
  margin-right: 20px; /* Space between each item */
}
.nav-link i {
  margin-right: 8px; /* Space between icon and text */
}

/* For larger icons */
.nav-link i.fa {
  font-size: 1.25rem; /* Larger icon size */
}
.nav-link:hover,
.nav-link:focus,
.nav-link.active {
  color: rgb(29, 155, 193) !important; /* Change to your desired hover color */
}

/* Show the dropdown on hover */
@media (min-width: 992px) {
  /* This matches Bootstrap's lg breakpoint */
  .navbar-secondary  .dropdown:hover .dropdown-menu,
  .navbar-secondary  .dropdown .dropdown-menu:hover {
    display: block;
  }
}

/* Optional: Change the color of the dropdown toggle on hover */
.navbar-secondary  .nav-item.dropdown:hover > .nav-link {
  color: rgb(29, 155, 193) !important; /* Or any other color */
}
</style>
