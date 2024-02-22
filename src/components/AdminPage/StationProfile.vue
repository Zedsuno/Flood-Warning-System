<template>
  <div class="css-1xpfgoq">
    <div class="css-1pnde8e">
      <h2 class="css-1c7p3y9">Profile</h2>
      <div class="css-j7qwjs">
        <div class="css-1yjvs5a">
          <label class="css-art8hl">Station ID</label>
          <div class="css-kjafn5">
            <input
              required=""
              name="stationId"
              class="css-2b30dp"
              value=""
              idenati-clicked="true"
            />
          </div>
          <p class="css-1qnatmj">
            ตัวระบุเฉพาะสำหรับสถานี สามารถประกอบด้วยตัวอักษรหรือตัวเลขเท่านั้นโดยไม่ต้องเว้นวรรค
          </p>
        </div>
        <div class="css-14iiu3h">
          <div class="css-i9gxme">
            <div class="css-0">
              <label class="css-art8hl">Hardware</label>
              <div class="css-kjafn5">
                <input name="hardware" class="css-2b30dp" value="" />
              </div>
            </div>
          </div>
          <button type="button" class="css-hvedth">เชื่อมโยงเซ็นเซอร์</button>
        </div>
        <div class="css-1yjvs5a">
          <div class="css-0">
            <label class="css-art8hl">Software</label>
            <div class="css-kjafn5">
              <input
                name="software"
                class="css-2b30dp"
                value=""
                idenati-clicked="true"
              />
            </div>
          </div>
        </div>
        <div class="css-j7qwjs"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Component logic here
};
</script>

<style scoped>
.css-1xpfgoq {
    box-sizing: border-box;
    padding-right: 16px;
    padding-left: 16px;
    width: 100%;
    
}

@media screen and (min-width: 62em) {
  .css-1pnde8e {
    border-radius: 0.75em;
    padding: 32px;
  }
}

.css-1pnde8e {
  background-color:  whitesmoke;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 0px 2px 0px,
    rgba(0, 0, 0, 0.16) 0px 1px 4px 0px;
  margin-bottom: 16px;
  border-radius: 0.5rem;
  padding: 16px;
}

@media screen and (min-width: 62em){

.css-1c7p3y9 {
    margin-top: 0px;
    
}}
.css-1c7p3y9 {
    
    font-size: 1.875rem;
    line-height: 1;
    font-weight: 700;
    font-family: Calibre, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    margin-bottom: 16px;
    margin-top: 8px;
}
.css-j7qwjs {
    display: flex;
    flex-direction: column;
}
.css-1yjvs5a {
    margin-bottom: 32px;
}

.css-art8hl {
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    margin: 0px;
    font-weight: 700;
    font-size: 0.875rem;
}
.css-kjafn5 {
    display: flex;
    position: relative;
}
.css-2b30dp {
    width: 100%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    transition: all 0.2s ease 0s;
    outline: none;
    appearance: none;
    font-size: 1rem;
    height: 2.5rem;
    border-radius: 0px;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-color: inherit;
    background-color: transparent;
}

.css-1qnatmj {
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    margin: 4px 0px;
    font-weight: 400;
    font-size: 0.75rem;
    color: rgb(132, 142, 154);
}

.css-14iiu3h {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin-bottom: 32px;
}

.css-i9gxme {
    -webkit-box-flex: 1;
    flex-grow: 1;
}

.css-hvedth {
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
    background-color: rgb(40, 43, 46);
    border: 2px solid transparent;
    color: rgb(250, 251, 253);
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;
}

.css-art8hl {
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    margin: 0px;
    font-weight: 700;
    font-size: 0.875rem;
}

.css-kjafn5 {
    display: flex;
    position: relative;
}

.css-2b30dp {
    width: 100%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    transition: all 0.2s ease 0s;
    outline: none;
    appearance: none;
    font-size: 1rem;
    height: 2.5rem;
    border-radius: 0px;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-color: inherit;
    background-color: transparent;
}

.css-1yjvs5a {
    margin-bottom: 32px;
}

.css-art8hl {
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    margin: 0px;
    font-weight: 700;
    font-size: 0.875rem;
}

.css-kjafn5 {
    display: flex;
    position: relative;
}

.css-2b30dp {
    width: 100%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    transition: all 0.2s ease 0s;
    outline: none;
    appearance: none;
    font-size: 1rem;
    height: 2.5rem;
    border-radius: 0px;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-color: inherit;
    background-color: transparent;
}

.css-j7qwjs {
    display: flex;
    flex-direction: column;
}
</style>
