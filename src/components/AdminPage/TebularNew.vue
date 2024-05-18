<template>
  <div class="row-teb mt-4-teb">
    <div class="col-12-teb">
      <div class="card-teb">
        <div class="card-teb-header">
          <h5-teb class="mb-0">ตารางข้อมูลแต่ละสถานี</h5-teb>
          <p class="text-sm mb-0"></p>
        </div>
        <div class="table-responsive">
          <div
            class="dataTable-wrapper dataTable-loading no-footer sortable fixed-height fixed-columns"
          >
            <div class="dataTable-top">
              <div class="dataTable-dropdown">
                <label
                  ><select
                    class="dataTable-selector"
                    v-model="itemsPerPage"
                    @change="onItemsPerPageChange"
                  >
                    <option :value="5" :selected="allStations.length <= 5">
                      5
                    </option>
                    <option :value="10" :selected="allStations.length > 5">
                      10
                    </option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                  </select>
                  รายการต่อหน้า</label
                >
              </div>
              <div class="dataTable-search">
                <input
                  class="dataTable-input"
                  placeholder="Search..."
                  type="text"
                  v-model="searchQuery"
                />
              </div>
            </div>
            <div class="dataTable-container">
              <table
                class="table table-flush dataTable-table"
                id="datatable-basic"
              >
                <thead class="thead-light">
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                      style="width: 22.5724%"
                    >
                      <a href="#" class="dataTable-sorter">ชื่อสถานี</a>
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                      style="width: 25.4117%"
                    >
                      <a href="#" class="dataTable-sorter">ที่ตั้งสถานี</a>
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                      style="width: 19.3072%"
                    >
                      <a href="#" class="dataTable-sorter">ระดับน้ำปัจจุบัน</a>
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                      style="width: 19.3072%"
                    >
                      <a href="#" class="dataTable-sorter">ระดับน้ำ %</a>
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                      style="width: 19.3072%"
                    >
                      <a href="#" class="dataTable-sorter">banklevel</a>
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                      style="width: 9.65361%"
                    >
                      <a href="#" class="dataTable-sorter">ระยะห่างเซนเซอร์</a>
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                      style="width: 9.65361%"
                    >
                      <a href="#" class="dataTable-sorter">ระดับตลิ่ง</a>
                    </th>
                    <!-- <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                      style="width: 9.65361%"
                    >
                      <a href="#" class="dataTable-sorter">ระดับความลึก</a>
                    </th> -->
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                      style="width: 17.3197%"
                    >
                      <a href="#" class="dataTable-sorter">ค่าเกณฑ์สถานะ</a>
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                      style="width: 15.0483%"
                    >
                      <a href="#" class="dataTable-sorter">สถานะ</a>
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                      style="width: 15.0483%"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="station in paginatedStations" :key="station._id">
                    <td class="text-sm font-weight-normal">
                      {{ station.stationName }}
                    </td>
                    <td class="text-sm font-weight-normal">
                      {{ station.location.address }},
                      {{ station.location.river }}, {{ station.location.state }}
                    </td>
                    <td class="text-sm font-weight-normal">
                      {{ station.waterLevel }} cm 
                    </td>
                    <td class="text-sm font-weight-normal">
                      {{ station.waterLevelPercentage }} % 
                    </td>
                    <td class="text-sm font-weight-normal">
                      {{ station.bankLevel }} cm
                    </td>
                    
                    <td class="text-sm font-weight-normal">
                      {{ station.sensorDistance }} cm
                    </td>
                    <td class="text-sm font-weight-normal">
                      {{ station.waterline }} cm
                    </td>
                    <!-- <td class="text-sm font-weight-normal">
                      {{ station.WaterDepth }} cm
                    </td> -->
                    <td class="text-sm font-weight-normal">
                      {{ getStatus(station) || 'ไม่ได้ส่ง Data เข้ามา' }}
                    </td>
                    <td class="text-sm font-weight-normal">
                      <span
                        class="status-badge"
                        :class="{ inactive: station.active === false }"
                      >
                        {{ station.active ? "ใช้งานอยู่" : "ไม่ได้ใช้งาน" }}
                      </span>
                    </td>
                    <td class="text-sm font-weight-normal">
                      <router-link to="/Station" class="dashboard-button"
                        >แดชบอร์ดสถานี</router-link
                      >
                      <router-link
                        :to="{
                          name: 'EditStation',
                          params: { stationId: station._id },
                        }"
                        class="edit-button"
                        >แก้ไข</router-link
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="dataTable-bottom">
              <div class="dataTable-info">{{ pageInfo }}</div>
              <nav class="dataTable-pagination">
                <ul class="dataTable-pagination-list">
                  <li class="pager" v-if="currentPage > 1">
                    <a href="#" @click="changePage(currentPage - 1)">‹</a>
                  </li>
                  <li
                    v-for="pageNum in paginationRange"
                    :key="pageNum"
                    :class="{ active: currentPage === pageNum }"
                  >
                    <a href="#" @click.prevent="changePage(pageNum)">{{
                      pageNum
                    }}</a>
                  </li>
                  <li class="pager" v-if="currentPage < totalPages">
                    <a href="#" @click="changePage(currentPage + 1)">›</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
export default {
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5,
      searchQuery: "",
    };
  },
  computed: {
    ...mapState('stations', ['allStations']),
  
    filteredStations() {
      return this.searchQuery
        ? this.allStations.filter(station =>
            station.stationId.toLowerCase().includes(this.searchQuery.toLowerCase()))
        : this.allStations;
    },
    totalPages() {
      return Math.ceil(this.filteredStations.length / this.itemsPerPage);
    },
    paginatedStations() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredStations.slice(start, start + this.itemsPerPage);
    },
    paginationRange() {
      let rangeStart = this.currentPage - 2;
      let rangeEnd = this.currentPage + 2;
      if (rangeStart < 1) {
        rangeStart = 1;
        rangeEnd = Math.min(5, this.totalPages);
      }
      if (rangeEnd > this.totalPages) {
        rangeEnd = this.totalPages;
        rangeStart = Math.max(1, this.totalPages - 4);
      }
      return Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => i + rangeStart);
    },
    pageInfo() {
      const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
      const endItem = Math.min(startItem + this.itemsPerPage - 1, this.filteredStations.length);
      return `Showing ${startItem} to ${endItem} of ${this.filteredStations.length} items.`;
    },
  },
  methods: {
    ...mapActions('stations', ['fetchAllStations']),
 
    getStatus(station) {
      return station.status;
    },
    fetchStationsAndSensorReadings() {
      this.fetchAllStations().then(() => {
        this.allStations.forEach(station => {
          if (station.hardware.length > 0) {
            this.fetchSensorData(station);
          }
        });
      }).catch(error => {
        console.error("Failed to fetch stations:", error);
      });
    },
    async updateWaterLevel() {
      if (!this.stationId) {
        console.error("updateWaterLevel was called without a stationId.");
        return;
      }
      console.log(`Updating water level for station ID ${this.stationId}`);
      try {
        const response = await axios.post(`http://localhost:3001/api/stations/updateWaterLevel`, {
          _id: this.stationId,
        });
        console.log(`Water level updated for station ID ${this.stationId}:`, response.data);
        this.stationData = response.data;
        this.$emit("stationSaved", this.stationData);
      } catch (error) {
        console.error(`Error updating water level for station ID ${this.stationId}:`, error);
      }
    },
    changePage(newPage) {
      this.currentPage = newPage;
    },
    onItemsPerPageChange() {
      this.currentPage = 1;
      this.itemsPerPage = parseInt(this.itemsPerPage, 10);
    },
  },
  mounted() {
    this.fetchStationsAndSensorReadings();
  },
  watch: {
    itemsPerPage() {
      this.changePage(1);  // Reset to the first page when items per page changes
    },
  },
};
</script>

<style>
.mt-4-teb {
  margin-top: 1.5rem;
}
.row-teb {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
}

.col-12-teb {
  flex: 0 0 auto;
  width: 100%;
}
.row-teb > * {
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: calc(var(--bs-gutter-x) * 0.5);
  padding-left: calc(var(--bs-gutter-x) * 0.5);
  margin-top: var(--bs-gutter-y);
}

.card-teb {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.card-teb {
  --bs-card-teb-spacer-y: 1rem;
  --bs-card-teb-spacer-x: 1rem;
  --bs-card-teb-title-spacer-y: 0.5rem;
  --bs-card-teb-border-width: 0;
  --bs-card-teb-border-color: rgba(0, 0, 0, 0.125);
  --bs-card-teb-border-radius: 0.75rem;
  --bs-card-teb-box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --bs-card-teb-inner-border-radius: 0.75rem;
  --bs-card-teb-cap-padding-y: 0.5rem;
  --bs-card-teb-cap-padding-x: 1rem;
  --bs-card-teb-cap-bg: #fff;
  --bs-card-teb-bg: #fff;
  --bs-card-teb-img-overlay-padding: 1rem;
  --bs-card-teb-group-margin: 0.75rem;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: var(--bs-card-teb-height);
  word-wrap: break-word;
  background-color: var(--bs-card-teb-bg);
  background-clip: border-box;
  border: var(--bs-card-teb-border-width) solid var(--bs-card-teb-border-color);
  border-radius: var(--bs-card-teb-border-radius);
}

.card-teb .card-teb-header {
  padding: 0.5rem;
}
.card-teb-header:first-child {
  border-radius: var(--bs-card-teb-inner-border-radius)
    var(--bs-card-teb-inner-border-radius) 0 0;
}
.card-teb-header {
  padding: var(--bs-card-teb-cap-padding-y) var(--bs-card-teb-cap-padding-x);
  margin-bottom: 0;
  color: var(--bs-card-teb-cap-color);
  background-color: var(--bs-card-teb-cap-bg);
  border-bottom: var(--bs-card-teb-border-width) solid
    var(--bs-card-teb-border-color);
}

.mb-0-teb {
  margin-bottom: 0;
}
.h4-teb,
.h5-teb,
.h6-teb,
h4-teb,
h5-teb,
h6-teb {
  font-weight: 600;
}
.h5-teb,
h5-teb {
  font-size: 2.25rem;
  line-height: 1.375;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.5;
}

.mb-0-teb {
  margin-bottom: 0;
}
p {
  line-height: 1.625;
  font-weight: 300;
}
.p,
p {
  font-size: 1rem;
}

.dataTable-wrapper .dataTable-top {
  padding: 1.5rem;
}

.dataTable-wrapper .dataTable-top .dataTable-dropdown {
  float: left;
}

.dataTable-bottom:after,
.dataTable-top:after {
  clear: both;
  content: " ";
  display: table;
}
*,
:after,
:before {
  box-sizing: border-box;
}

.dataTable-wrapper .dataTable-top .dataTable-dropdown label {
  margin-bottom: 0;
  margin-left: 0;
  color: #7b809a;
  font-weight: 400;
}

.dataTable-wrapper
  .dataTable-top
  .dataTable-dropdown
  label
  .dataTable-selector {
  border-color: #f0f2f5;
  border-radius: 0.375rem;
}
.dataTable-selector {
  padding: 6px;
}

.dataTable-table {
  max-width: 100%;
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
}
.table {
  --bs-table-color: #222222;
  --bs-table-bg: transparent;
  --bs-table-border-color: #f0f2f5;
  --bs-table-accent-bg: transparent;
  --bs-table-striped-color: #7b809a;
  --bs-table-striped-bg: rgba(0, 0, 0, 0.05);
  --bs-table-active-color: #7b809a;
  --bs-table-active-bg: rgba(0, 0, 0, 0.1);
  --bs-table-hover-color: #7b809a;
  --bs-table-hover-bg: rgba(0, 0, 0, 0.075);
  width: 100%;
  margin-bottom: 1rem;
  color: var(--bs-table-color);
  vertical-align: top;
  border-color: var(--bs-table-border-color);
}
.dataTable-bottom > div:last-child,
.dataTable-bottom > nav:last-child,
.dataTable-top > div:last-child,
.dataTable-top > nav:last-child {
  float: right;
}

.dataTable-wrapper .dataTable-top .dataTable-search input {
  font-size: 0.875rem;
  color: #495057;
  border: 1px solid #f0f2f5;
  border-radius: 0.375rem;
  margin-left: auto;
}

.dataTable-input {
  padding: 6px 12px;
}

.table > thead {
  vertical-align: bottom;
}

tbody,
td,
tfoot,
th,
thead,
tr {
  border-color: inherit;
  border-style: solid;
  border-width: 0;
}

.dataTable-container {
  overflow-x: scroll; /* Enable horizontal scrolling */
  width: 100px; /* Full width of parent container */
  min-width: 100%; /* Minimum width is full width of parent container */
}
.dataTable-bottom:after {
  content: "";
  display: table;
  clear: both;
}

/* Add styles for the scrollbar for visibility */
.dataTable-container::-webkit-scrollbar {
  height: 10px;
}

.dataTable-container::-webkit-scrollbar-thumb {
  background: #cccccc;
  border-radius: 5px;
}

.dataTable-container {
  scrollbar-width: thin;
  scrollbar-color: #cccccc transparent;
}
.dataTable-wrapper.no-footer .dataTable-container {
  border-bottom: 0;
}
.dataTable-wrapper .dataTable-container .table thead tr th {
  padding: 0.75rem 1.5rem;
  font-weight: bolder;
  color: #7b809a;
  text-transform: uppercase;
  font-size: 1rem;
}
.table > :not(:last-child) > :last-child > * {
  border-bottom-color: #f0f2f5;
}
.dataTable-table > thead > tr > th {
  background-color: #f8f9fa; /* Light background for table head */
  text-transform: uppercase; /* Uppercase header text */
  color: #6c757d; /* Light font color for header text */
  font-weight: normal; /* Normal font weight for header text */
  border-bottom: 2px solid #dee2e6; /* Lighter border for the bottom */
  vertical-align: bottom;
  text-align: left;
}

.dataTable-wrapper .dataTable-container .table tbody tr td {
  padding: 0.75rem 1.5rem;
  text-align: left; /* Aligns text to the center horizontally */
  vertical-align: middle; /* Aligns content to the middle vertically */
}

.table td,
.table th {
  white-space: nowrap;
}

.dataTable-wrapper .dataTable-bottom {
  padding: 1.5rem;
  padding-top: 0;
}

.dataTable-wrapper .dataTable-bottom .dataTable-info {
  color: #7b809a;
  font-size: 0.875rem;
}

.dataTable-bottom > div:last-child,
.dataTable-bottom > nav:last-child,
.dataTable-top > div:last-child,
.dataTable-top > nav:last-child {
  float: right;
}

.dataTable-pagination ul {
  margin: 0;
  padding-left: 0;
}

.dataTable-pagination li {
  list-style: none;
  float: left;
}

.dataTable-wrapper
  .dataTable-bottom
  .dataTable-pagination
  .dataTable-pagination-list
  li
  a {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7b809a;
  padding: 0;
  margin: 0 3px;
  border: 1px solid #dee2e6;
  border-radius: 50% !important;
  width: 36px;
  height: 36px;
  font-size: 0.875rem;
  margin-left: 0;
}

.dataTable-wrapper
  .dataTable-bottom
  .dataTable-pagination
  .dataTable-pagination-list
  .active
  a {
  background: transparent;
  background-image: linear-gradient(195deg, #50cce8, #11abcd);
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.09),
    0 2px 3px -1px rgba(0, 0, 0, 0.07);
  color: #fff;
  border: none;
  border-radius: 50% !important;
}

.dataTable-pagination .pager a {
  font-weight: 700;
}

.dataTable-table th a {
  text-decoration: none;
  color: inherit;
}

.dataTable-sorter {
  display: inline-block;
  height: 100%;
  position: relative;
  width: 100%;
  font-size: 1rem;
}
a {
  letter-spacing: 0;
  color: #344767;
}
.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.375rem;
  transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
}

/* Style for active status */
.status-badge:not(.inactive) {
  background-color: #28a745; /* Green background for active status */
  color: #ffffff; /* White text for active status */
}

/* Style for inactive status */
.status-badge.inactive {
  background-color: #dc3545; /* Red background for inactive status */
  color: #ffffff; /* White text for inactive status */
}
.dashboard-button {
  border-radius: 30px;
  /* Background color for buttons */
  color: #fff; /* Text color for buttons */
  border: none; /* No border for buttons */
  padding: 8px 16px; /* Padding inside the buttons */
  font-size: 14px; /* Font size for button text */
  margin-right: 8px; /* Right margin for buttons */
  cursor: pointer;
  text-transform: uppercase; /* Uppercase text for buttons */
  border-radius: 9999px; /* Fully rounded corners for buttons */
  background-color: #4a90e2;
  display: inline-block; /* Inline-block allows for margin auto to work */
}

.edit-button {
  border-radius: 30px;
  /* Background color for buttons */
  color: #fff; /* Text color for buttons */
  border: none; /* No border for buttons */
  padding: 8px 16px; /* Padding inside the buttons */
  font-size: 14px; /* Font size for button text */
  margin-right: 8px; /* Right margin for buttons */
  cursor: pointer;
  text-transform: uppercase; /* Uppercase text for buttons */
  border-radius: 9999px; /* Fully rounded corners for buttons */
  background-color: #f5a623;
  display: inline-block; /* Inline-block allows for margin auto to work */
}

.threshold-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.threshold-list li {
  display: flex;
  align-items: center;
  margin-bottom: 4px; /* Adjust as needed */
}

.threshold-indicator {
  width: 12px; /* Adjust as needed */
  height: 12px; /* Adjust as needed */
  display: inline-block;
  margin-right: 5px; /* Adjust as needed */
  border-radius: 50%; /* Makes the color indicator circular */
}

.threshold-text {
  color: #222225; /* Keeps text color black */
}
</style>
