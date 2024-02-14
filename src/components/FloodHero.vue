<template>
  <header class="bg-gradient-dark">
    <div class="page-header min-vh-60" :style="backgroundStyle">
      <span class="mask bg-gradient-dark opacity-5"></span>
      <div class="container header-content">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center mx-auto my-auto">
            <h1 class="text-h1">แนะนำคู่มือเตรียมตัวเพื่อสู้กับน้ำท่วม</h1>
            <p class="lead mb-4 text-p opacity-8">
              ค้นพบวิธีการป้องกันและเตรียมความพร้อมสำหรับสถานการณ์น้ำท่วมได้ที่นี่
            </p>
            <a
              href="../assets/File/flood-handbook.pdf"
              download="Guidebook.pdf"
            >
              <button type="button" class="btn bg-white text-dark">
                ดาวน์โหลดคู่มือ
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "FloodBookHero",
  data() {
    return {
      // Use require to ensure the image is processed by webpack
      backgroundStyle: {
        backgroundImage: `url(${require("@/assets/Picture/floodpng.jpg")})`,
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
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
}

.header-content {
  position: relative;
  z-index: 3;
  padding-top: 100px;
  padding-bottom: 100px;
}

.btn {
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
