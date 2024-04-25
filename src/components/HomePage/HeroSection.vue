<template>
  <header class="bg-gradient-dark">
    <div class="page-header min-vh-75" :style="backgroundStyle">
      <span class="mask bg-gradient-dark opacity-5"></span>
      <div class="container header-content">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center mx-auto my-auto">
            <h1 class="text-h1">
              ยินดีต้อนรับเข้าสู่ระบบเตือนภัยน้ำภูมิภาคเชียงราย
            </h1>
            <p class="lead mb-4 text-p opacity-8">
              คุณสามารถตรวจสอบกิจกรรมที่เกี่ยวข้องกับการเตือนภัยน้ำในภูมิภาคได้จากที่นี่
            </p>
            <router-link to="/map" custom v-slot="{ navigate }">
  <button type="submit" class="btn bg-white text-dark" @click="navigate">
    เฝ้าระวังน้ำท่วม
  </button>
</router-link>
            <h6 class="text-h6 mb-2 mt-5">ค้นหาเราบน</h6>
            <div class="d-flex justify-content-center">
              <!-- Social media icons using Font Awesome -->
              <a href="https://www.facebook.com"
                ><i class="fab fa-facebook text-lg text-white me-4"></i
              ></a>
              <a href="https://www.instagram.com/"
                ><i class="fab fa-instagram text-lg text-white me-2"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeroSection",
  data() {
    return {
      // Use require to ensure the image is processed by webpack
      backgroundStyle: {
        backgroundImage: `url(${require("@/assets/Picture/Flood.avif")})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        overlayOpacity: 0.5,
      },
    };
  },
  methods: {},
};
</script>

<style scoped>
/* Scoped styles
ensure that CSS only applies to this component */

.page-header {
  position: relative;
  z-index: 1;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
}

.header-content {
  position: relative;
  z-index: 3;
  padding-top: 100px;
  padding-bottom: 100px;
}
.btn {
  /* Enhance the button style for better visibility and interaction */
  font-weight: bold;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.text-h1 {
  font-weight: 600;
  font-size: 3rem;
  color: whitesmoke;
}
.text-h6 {
  font-weight: 600;
  font-size: 1rem;
  color: whitesmoke;
}

.text-p {
  font-size: 1.25rem;
  color: whitesmoke;
}

.fab {
  font-size: 1.25rem;
}
</style>
