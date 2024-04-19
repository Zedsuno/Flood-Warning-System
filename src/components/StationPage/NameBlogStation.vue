<template>
<div class="e1i1uj6o1 css-1eyq3j2">
          <div class="css-1x4rk3v e1i1uj6o2">
            <div class="e1i1uj6o1 css-l705fq">
              <div class="css-sb8k6g e1i1uj6o2">
                <div class="css-1lekzkb">
                  <div class="css-0">
                    <div class="css-1xhj18k">
                      <h2 class="css-obye91">นางแล</h2>
                      <div class="css-csyjyt">ไม่ดำเนินการ</div>
                    </div>
                    <p class="css-1qtpv3j">เมืองเชียงราย</p>
                    <div class="css-1xhj18k">
                      <p class="css-klhis3">13.72, 100.59</p>
                      <div class="css-1xhj18k">
                        <p class="css-1plaodm">Local Time:</p>
                        <p class="css-1m046fs">2:14 pm</p>
                      </div>
                    </div>
                    <p class="css-1knou7x">Elev: 20 m</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'NameBlogStation',
  data() {
    return {
      stationData: null,
      error: null,
    };
  },
  methods: {
    async fetchStationData() {
      try {
        const response = await axios.get(`http://localhost:3001/api/stations/${this.stationId}`);
        this.stationData = response.data;
      } catch (error) {
        console.error("Error fetching station data:", error);
        this.error = error;
      }
    }
  },
  props: {
    stationId: String
  },
  watch: {
    stationId(newVal) {
      if (newVal) {
        this.fetchStationData();
      }
    }
  },
  created() {
    if (this.stationId) {
      this.fetchStationData();
    }
  }
};
</script>

<style scoped>
.css-1eyq3j2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -1rem;
  margin-left: -1rem;
}

.css-1x4rk3v {
  box-sizing: border-box;
  padding-right: 1rem;
  padding-left: 1rem;
  width: 100%;
}
.css-l705fq {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  padding-bottom: 16px;
  margin-right: -16px;
  margin-left: -16px;
}

@media screen and (min-width: 512px) {
  .css-sb8k6g {
    flex-basis: 100%;
    -webkit-box-flex: 0;
    flex-grow: 0;
    max-width: 100%;
  }
}
.css-sb8k6g {
  box-sizing: border-box;
  padding-right: 16px;
  padding-left: 16px;
  width: 100%;
}

.css-1lekzkb {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
}

.css-1xhj18k {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
}

@media screen and (min-width: 62em) {
  .css-obye91 {
    font-size: 3rem;
  }
}

.css-obye91 {
  font-size: 2.25rem;
  line-height: 1;
  font-weight: 700;
  font-family: 'Prompt', sans-serif;
  margin-bottom: 0px;
  text-transform: uppercase;
  color: rgb(51, 51, 51);
  margin-right: 16px;
}

.css-csyjyt {
  display: inline-block;
  padding-left: 4px;
  padding-right: 4px;
  text-transform: uppercase;
  font-size: 0.75rem;
  border-radius: 0.125rem;
  font-weight: 700;
  white-space: nowrap;
  vertical-align: middle;
  box-shadow: rgb(26, 167, 0) 0px 0px 0px 1px inset;
  color: rgb(26, 167, 0);
  margin-top: 8px;
  height: 16px;
}

@media screen and (min-width: 62em) {
  .css-1qtpv3j {
    font-size: 1.25rem;
  }
}
.css-1qtpv3j {
  font-family: 'Prompt', sans-serif;
  margin: 0px 0px 4px;
  font-weight: 500;
  font-size: 1.125rem;
  color: rgb(87, 91, 96);
}

.css-1xhj18k {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
}

@media screen and (min-width: 62em) {
  .css-klhis3 {
    font-size: 1.125rem;
  }
}
.css-klhis3 {
  font-family: 'Prompt', sans-serif;
  margin: 0px 32px 0px 0px;
  font-weight: 500;
  font-size: 1rem;
  color: rgb(87, 91, 96);
}

.css-1xhj18k {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
}

.css-1plaodm {
  font-family: 'Prompt', sans-serif;
  margin: 0px;
  font-weight: 400;
  font-size: 0.875rem;
  color: rgb(87, 91, 96);
}

@media screen and (min-width: 62em) {
  .css-1m046fs {
    font-size: 1.125rem;
  }
}
.css-1m046fs {
  font-family: 'Prompt', sans-serif;
  margin: 0px 0px 0px 4px;
  font-weight: 500;
  font-size: 1rem;
  color: rgb(87, 91, 96);
}

@media screen and (min-width: 62em) {
  .css-1knou7x {
    font-size: 1.125rem;
  }
}
.css-1knou7x {
  font-family: 'Prompt', sans-serif;
  margin: 0px 0px 4px;
  font-weight: 500;
  font-size: 1rem;
  color: rgb(87, 91, 96);
}
</style>
