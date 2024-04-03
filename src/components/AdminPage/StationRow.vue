<template>
    <div
      role="row"
      class="tr"
      style="display: flex; flex: 1 0 auto; min-width: 850px"
    >
      <div
        colspan="1"
        role="cell"
        class="td"
        style="
          box-sizing: border-box;
          flex: 200 0 auto;
          min-width: 200px;
          width: 200px;
          text-align: left;
        "
      >
        {{ station.stationId }}
      </div>
      <div
        colspan="1"
        role="cell"
        class="td"
        style="
          box-sizing: border-box;
          flex: 200 0 auto;
          min-width: 200px;
          width: 200px;
          text-align: left;
        "
      >
        {{ station.stationId }}
      </div>
      <div
        colspan="1"
        role="cell"
        class="td"
        style="
          box-sizing: border-box;
          flex: 200 0 auto;
          min-width: 200px;
          width: 200px;
          text-align: left;
        "
      >
        {{ station.location.address }}
      </div>
      <div
        colspan="1"
        role="cell"
        class="td"
        style="
          box-sizing: border-box;
          flex: 100 0 auto;
          min-width: 100px;
          width: 100px;
          text-align: center;
        "
      >
        INACTIVE
      </div>
      <div colspan="1" role="cell" class="td">
        <AddStationDash :stationId="station._id" @stationSaved="handleStationSaved" />
      </div>
    </div>
  </template>
  
  <script>
  import AddStationDash from './AddStationDash.vue';
  
  export default {
    name: 'StationRow',
    components: {
      AddStationDash,
    },
    props: {
      station: {
        type: Object,
        required: true,
      },
    },
    methods: {
      handleStationSaved(stationData) {
        // Optionally, you can include additional logic here when a station is saved.
        console.log('Station saved:', stationData);
      },
    },
  };
  </script>