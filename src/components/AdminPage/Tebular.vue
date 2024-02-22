<template>
  <div class="div_Tebular_Blog">
    <div class="Div_Top_Search_Fill">
      <div class="Search_Block">
        <div class="SVG_Seach">
          <!-- Search Icon SVG -->
          <svg
            viewBox="0 0 24 24"
            focusable="false"
            role="presentation"
            class="SVG_Seach_Icon"
          >
            <path
              fill="currentColor"
              d="M23.414,20.591l-4.645-4.645a10.256,10.256,0,1,0-2.828,2.829l4.645,4.644a2.025,2.025,0,0,0,2.828,0A2,2,0,0,0,23.414,20.591ZM10.25,3.005A7.25,7.25,0,1,1,3,10.255,7.258,7.258,0,0,1,10.25,3.005Z"
            ></path>
          </svg>
        </div>
        <!-- Search Input -->
        <input
          placeholder="Search..."
          class="Input-Search"
          idenati-clicked="true"
        />
      </div>
      <div class="Block_Fill ">
        <div class="Block_Fill_In">
          <div class="BTW_BLOCK"></div>
          <!-- Add Filter Button -->
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="popover-803"
            class="Btn_pop_fill"
          >
            กรองข้อมูล
          </button>
        </div>
      </div>
    </div>
    <div class="Table_section">
      <div class="Table_section_In">
        <div class="Table_section_Insite">
          <!-- Table container with dynamic height based on viewport -->
          <div style="height: calc(-265.2px + 100vh)">
            <!-- Table structure -->
            <div class="table">
              <!-- Table head -->
              <div class="thead">
                <!-- Table row for headers -->
                <div
                  role="row"
                  class="tr"
                  style="display: flex; flex: 1 0 auto; min-width: 850px"
                >
                  <!-- Column headers -->
                  <div
                    colspan="1"
                    role="columnheader"
                    class="th"
                    style="
                      box-sizing: border-box;
                      flex: 200 0 auto;
                      min-width: 200px;
                      width: 200px;
                      text-align: left;
                    "
                  >
                    สถานี
                  </div>
                  <div
                    colspan="1"
                    role="columnheader"
                    class="th"
                    style="
                      box-sizing: border-box;
                      flex: 200 0 auto;
                      min-width: 200px;
                      width: 200px;
                      text-align: left;
                    "
                  >
                    ID
                  </div>
                  <div
                    colspan="1"
                    role="columnheader"
                    class="th"
                    style="
                      box-sizing: border-box;
                      flex: 200 0 auto;
                      min-width: 200px;
                      width: 200px;
                      text-align: left;
                    "
                  >
                    Location
                  </div>
                  <div
                    colspan="1"
                    role="columnheader"
                    class="th"
                    style="
                      box-sizing: border-box;
                      flex: 100 0 auto;
                      min-width: 100px;
                      width: 100px;
                      text-align: center;
                    "
                  >
                    สถานะ
                  </div>
                  <div colspan="1" role="columnheader" class="th"></div>
                  <!-- Empty header for alignment -->
                </div>
              </div>
              <!-- Table body -->
              <div class="tbody Table">
                <div
                  style="
                    position: relative;
                    height: 485px;
                    overflow: auto;
                    will-change: transform;
                    direction: ltr;
                  "
                >
                  <div style="height: 0px; width: 100%"></div>
                  <!-- Table rows will be dynamically inserted here -->
                </div>
              </div>
              <!-- Table foot (if needed) -->
              <div class="tfoot"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- Pagination section -->
      <div class="Div_Footer_TB">
        <div class="Div_Footer_Page">
          <!-- Page navigation text -->
          <p class="Footer_Page">Page 1 of 1</p>
          <p class="Footer_Page">1-25 / ~0 results</p>
          <!-- Pagination buttons -->
          <div class="Footer-Next-Page">
            <button
              disabled
              aria-disabled="true"
              type="button"
              class="Botton-Pre"
            >
              Previous
            </button>
            <button
              disabled
              aria-disabled="true"
              type="button"
              class="Botton-next"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchAndFilter",
  // Include data, methods, computed properties, etc., as needed
};
</script>

<style scoped>
.Div_Top_Search_Fill {
  display: flex;
  flex-direction: row;
  -webkit-box-align: baseline;
  align-items: baseline;
  margin-bottom: 16px;
}
.Search_Block {
  display: flex;
  position: relative;
}
.SVG_Seach {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: absolute;
  height: 2.5rem;
  width: 2.5rem;
  font-size: 1rem;
  top: 0px;
  z-index: 2;
  left: 0px;
}
.SVG_Seach_Icon {
  width: 1em;
  height: 1em;
  color: rgb(153, 153, 153);
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
  backface-visibility: hidden;
}
.Input-Search {
  width: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  transition: all 0.2s ease 0s;
  outline: none;
  appearance: none;
  font-size: 1rem;
  padding-left: 2.5rem;
  height: 2.5rem;
  border-radius: 0px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-color: inherit;
  background-color: transparent;
  margin-right: 8px;
}
.Block_Fill  {
  display: flex;
  flex-direction: row;
  -webkit-box-align: baseline;
  align-items: baseline;
}
.Block_Fill_In {
  display: flex;
  flex-direction: row;
  line-height: 1;
}
.BTW_BLOCK {
  margin-right: 8px;
}
.Btn_pop_fill {
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
  height: 1.5rem;
  min-width: 2.5rem;
  font-size: 0.625rem;
  padding-left: 12px;
  padding-right: 12px;
  background-color: transparent;
  border-color: rgb(255, 255, 255);
  border-style: solid;
  border-width: 2px;
  color: rgb(255, 255, 255);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin-top: 2px;
  margin-bottom: 2px;
}
.Table_section {
  position: relative;
}
.Table_section_In {
  opacity: 1;
}
.Table_section_Insite .table {
  border-color: rgb(40, 43, 46);
}

.Table_section_Insite .table {
  display: inline-block;
  overflow-x: auto;
}

.Table_section_Insite .table {
  border-spacing: 0px;
  border-width: 1px 0px 0px;
  border-top-style: solid;
  border-top-color: rgb(238, 238, 238);
  border-image: initial;
  border-bottom-style: initial;
  border-bottom-color: initial;
  border-left-style: initial;
  border-left-color: initial;
  border-right-style: initial;
  border-right-color: initial;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  width: 100%;
}

.Table {
  min-width: 867px;
}
.Div_Footer_TB {
  padding-top: 8px;
  border-top-width: 2px;
  border-top-color: rgb(77, 84, 91);
  color: rgb(191, 191, 191);
}
.Div_Footer_Page {
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  height: 24px;
}
.Footer_Page {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: 1;
  font-size: 0.75rem;
}
.Footer-Next-Page {
  display: flex;
  flex-direction: row;
}
.Botton-Pre {
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
  height: 1.5rem;
  min-width: 2.5rem;
  font-size: 0.625rem;
  padding-left: 12px;
  padding-right: 12px;
  background-color: transparent;
  border: 2px solid transparent;
  color: rgb(255, 255, 255);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin-right: 8px;
}
.Botton-next {
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
  height: 1.5rem;
  min-width: 2.5rem;
  font-size: 0.625rem;
  padding-left: 12px;
  padding-right: 12px;
  background-color: transparent;
  border: 2px solid transparent;
  color: rgb(255, 255, 255);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
}
</style>
