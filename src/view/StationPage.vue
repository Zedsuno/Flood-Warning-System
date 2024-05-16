<template>
  <div class="Station-Container-Page">
    <div class="Station-Blog-all">
      <div class="Space-Top"></div>
      <div class="Station-Blog-Space">
        <NameBlogStation :station-id="selectedStationId" />
        <NavBlogStation />
        <div class="row" style="width: 100%;">
          <div class="col-5">
            <BlogKPI :station-id="selectedStationId" />
          </div>
          <div class="col-7">
            <Mapstation />
          </div>
        </div>
        <!-- <BlogKPI />
        <Mapstation /> -->
      </div>
    </div>
  </div>
</template>

<script>
import NameBlogStation from '../components/StationPage/NameBlogStation';
import NavBlogStation from '../components/StationPage/NavBlogStation';
import BlogKPI from "../components/StationPage/ฺBlogKPI.vue"
import Mapstation from '../components/StationPage/MapStation';

export default {
  name: 'StationPage',
  components: {
    NameBlogStation, 
    NavBlogStation, 
    BlogKPI, 
    Mapstation
  },
  data() {
    return {
      selectedStationId: null,
    };
  },
  methods: {
    fetchStationId() {
      // Fetch the station ID from the URL parameters
      this.selectedStationId = this.$route.params.stationId;
    }
  },
  watch: {
    // React to changes in the route parameters
    '$route.params.stationId'(newVal) {
      this.selectedStationId = newVal;
    }
  },
  created() {
    this.fetchStationId();
  }
};
</script>

<style scoped>
@media screen and (min-width: 62em) {
  .Space-Top {
    padding-top: 64px;
    padding-bottom: 90px;
  }
}

@media screen and (min-width: 48em) {
  .Space-Top {
    padding-top: 32px;
    padding-bottom: 64px;
  }
}

.Space-Top {
  padding-top: 16px;
  padding-bottom: 64px;
  position: relative;
}

@media screen and (min-width: 62em) {
  .Station-Blog-all {
    padding-bottom: 32px;
  }
}

@media screen and (min-width: 48em) {
  .Station-Blog-all {
    padding-bottom: 16px;
  }
}

.Station-Blog-all {
  min-height: 100vh;
  padding-bottom: 0px;
}

.Station-Blog-Space {
  margin-right: auto;
  margin-left: auto;
  padding-right: 1rem;
  padding-left: 1rem;
  width: 100%;
}
</style>