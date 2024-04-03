<template>
  <div class="container-map-main">
    <div id="sidebar-map-main">
    <!-- sidebar-map-main header with logo and menu icons -->
    <div class="sidebar-map-main-header">
      <div class="logo">LOGO</div>
      <div class="menu-icons">
        <!-- Add icons here -->
      </div>
    </div>

    <!-- Search and filter section -->
    <div class="search-filter-section">
      <div class="search-box">
        <input type="text" placeholder="ค้นหา" v-model="searchQuery" />
      </div>
      <div class="filter-box">
        <select v-model="selectedFilter">
          <option disabled value="">เลือกอำเภอ</option>
          <!-- options should be rendered from the data properties -->
        </select>
      </div>
      <div class="filter-status">
        <!-- Status indicators can be rendered here -->
      </div>
    </div>

    <!-- Additional sidebar-map-main content -->
  </div>
    <div id="map" style="height: 750px;">
    
    </div>
    
  </div>
  
</template>

<script>
import L from 'leaflet';

export default {
  data() {
    return {
      
      selectedFilter: '',
      // Your existing data properties
      map: null, // For storing the Leaflet map instance
    };
  },
  methods: {
    initializeMap() {
      const chiangRaiCoords = [19.91048, 99.840576];
      const map = L.map("map").setView(chiangRaiCoords, 13); // Example center and zoom

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Example: Add a marker
      L.marker([19.91048, 99.840576]).addTo(map)
        .bindPopup('นางแล.')
        .openPopup();
      
      // Add more initialization code as needed (layers, controls, etc.)
    },
  },
  mounted() {
    this.initializeMap();
  },
};
</script>

<style>


.container-map-main {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%; /* Full viewport height */
  margin: 0; /* Remove default margins */
  overflow: hidden; /* Prevent scrollbars if content overflows */
}

.map {
  flex-grow: 1;
  height: 700px;
  width: 300px; /* Takes up remaining space */
}
.leaflet-container-map-main {
  height: 100%;
  width: 100%;
}

#sidebar-map-main {
  width: 300px; /* Reduced width for the sidebar-map-main */
  background-color: #fff; /* Background color for the sidebar-map-main */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Shadow effect */
  display: flex;
  flex-direction: column; /* Align sidebar-map-main content vertically */
  justify-content: flex-start; /* Align content to the top */
  padding: 1rem; /* Padding inside the sidebar-map-main */
}

#sidebar-map-main .search-section,
#sidebar-map-main .filter-section {
  margin-bottom: 1rem; /* Space between sections */
}

#sidebar-map-main input[type="text"],
#sidebar-map-main select {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd; /* Light grey border */
  border-radius: 0.25rem; /* Slightly rounded corners */
}

#sidebar-map-main ul {
  list-style: none; /* Remove list bullets */
  padding: 0;
  margin: 0;
}

#sidebar-map-main .search-button {
  width: 100%;
  padding: 0.5rem;
  background-color: #11abcd; /* Bootstrap primary color for example */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#sidebar-map-main .search-button:hover {
  background-color: #0056b3; /* Darken button on hover */
}

/* Logo styles */
#sidebar-map-main .logo {
  font-size: 1.5rem; /* Larger font size for the logo */
  font-weight: bold; /* Make the logo text bold */
  margin-bottom: 2rem; /* Space below the logo */
}

/* Remove default list styles for any lists in the sidebar-map-main */



#sidebar-map-main li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee; /* Light border between items */
  cursor: pointer;
}

#sidebar-map-main li:hover {
  background-color: #f9f9f9; /* Light grey on hover */
}

/* Additional styles for popups or other elements can be added here */
</style>