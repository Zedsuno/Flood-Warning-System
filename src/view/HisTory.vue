<template>
  <!-- Hero Section -->
  <!-- <FloodHero /> -->
  <!-- <InforFloodSection/> -->

  <header class="bg-gradient-dark">
    <div class="page-header min-vh-60" :style="backgroundStyle">
      <span class="mask bg-gradient-dark opacity-5"></span>
      <div class="container header-content">
        <div class="row justify-content-center">
          <div class="col-lg-15 text-center mx-auto my-auto">
            <h1 class="text-h1">ประวัติเหตุการณ์น้ำท่วม</h1>
            <p class="lead mb-16 text-p opacity-8">
              ประวัติเหตุการณ์น้ำท่วมในจังหวัดเชียงราย
            </p>
          </div>
        </div>
      </div>
    </div>
  </header>

  <div class="history">
    <div class="grid-container">
      <nav
        class="breadcrumb"
        role="navigation"
        aria-labelledby="system-breadcrumb"
      >
        <h2 id="system-breadcrumb" class="visually-hidden">Breadcrumb</h2>
        <ol>
          <li>
            <a href="/" previewlistener="true">หน้าแรก</a>
          </li>
          <li>ประวัติเหตุการณ์น้ำท่วม</li>
        </ol>
      </nav>
      <!-- card content -->
      <article class="flood-article">
        <!-- Insert your flood article content here -->
        <section>
          <div class="card-content">
            <div class="content-header">
              <nav
                class="breadcrumb"
                role="navigation"
                aria-labelledby="system-breadcrumb"
              >
                <h2 id="system-breadcrumb" class="visually-hidden">
                  Breadcrumb
                </h2>
                <ol>
                  <div class="top-box">
                    <p>สถานการณ์เฝ้าระวังระดับสีเหลือง</p>
                    <li>
                      เฝ้าระวังน้ำท่วมฉับพลัน เนื่องจากกรมอุตุฯ
                      แจ้งเตือนจะมีฝนตกหนักในช่วง 17 -19 พค 2560
                    </li>
                  </div>
                </ol>
              </nav>
            </div>
            <div class="history-article">
              <div>
                <img
                  src="../assets/Picture/cleaning.jpg"
                  width="480"
                  height="395"
                  alt="Cleanning after flood. "
                  typeof="foaf:Image"
                  class="image-style-large"
                />
              </div>
            </div>
          </div>
          <div class="card-content">
            <div class="content-header">
              <nav
                class="breadcrumb"
                role="navigation"
                aria-labelledby="system-breadcrumb"
              >
                <h2 id="system-breadcrumb" class="visually-hidden">
                  Breadcrumb
                </h2>
                <ol>
                  <div class="top-box">
                    <p1> สถานการณ์วิกฤติระดับสีแดง @ อ.เวียงเชียงรุ้ง </p1>
                    <li>
                      เวลา 12:15 24 สิงหาคม 59 น STG02 สะพานบ้านเหล่า ต.ทุ่งก่อ
                      อ.เวียงเชียงรุ้ง เกิดน้ำท่วมบริเวณม.6 และ ม.11 ต.ทุ่งก่อ
                    </li>
                  </div>
                </ol>
              </nav>
            </div>
            <div class="history-article">
              <div>
                <img
                  src="../assets/Picture/cleaning.jpg"
                  width="480"
                  height="395"
                  alt="Cleanning after flood. "
                  typeof="foaf:Image"
                  class="image-style-large"
                />
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  </div>
</template>

<script>
// import FloodHero from '../components/FloodHero.vue';
// import InforFloodSection from '../components/InforFloodSection.vue';
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
.flood-article {
  background-color: #fff;
  /* White background for the article */
  padding: 1.5rem;
  /* Padding inside the article */
  border-radius: 1rem;
  /* Rounded corners for the article */
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  /* Box shadow for 3D effect */
}

.card-content {
  margin-bottom: 1.5rem;
}

.content-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-style-large {
  border-radius: 1rem;
}

.history-article {
  background-color: #f1fafc;
  /* White background for the article */
  padding: 1.5rem;

  /* Padding inside the article */
  border-radius: 1rem;
  /* Rounded corners for the article */
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  /* Box shadow for 3D effect */
}

.top-box p1 {
  font-size: 24px;
  color: #ff0000;
}

.top-box p {
  font-size: 24px;
  color: #f6c002;
}

.checklist_fema__image--processed {
  padding: 30px 25px 5px 25px;
  background-repeat: no-repeat;
  margin: 0;
  height: 100%;
  background-size: cover;
  width: 100% !important;
  background-color: #11abcd0f;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

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

.breadcrumb li:not(:last-child)::after {
  content: ">";
  /* Add > between the items */
  margin: 0 10px;
  /* Add some horizontal space around the > */
  color: #333;
  /* Set the color of the > */
}

.breadcrumb li:last-child {
  color: #666;
  /* Set the color of the last item */
}

body,
html {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.history {
  background-color: #f4f4f4;
  /* Light grey background */
  padding: 2rem;
  /* Padding around the content */
}

.body-history {
  display: flex;
  flex-direction: column;
  /* เรียงตามแนวดิ่ง */
  align-items: center;
  /* จัดกล่องให้อยู่ตรงกลางของหน้าจอ */
}

.bottom-box p1 {
  color: #000000;
  text-align: center;
  font-size: 15px;
}

.grid-container {
  max-width: 64rem;
  /* Maximum width of the container */
  margin: auto;
  /* Center the container */

  padding: 1rem;
  /* Padding inside the container */
}

.breadcrumb {
  font-size: 16px;
  /* Set the font size */
  color: #333;
  /* Set the font color */
}

.breadcrumb a {
  color: #0066cc;
  /* Set the link color */
  text-decoration: none;
  /* Remove underline from links */
}

.breadcrumb ol {
  list-style: none;
  /* Remove default list styling */
  padding: 0;
  /* Remove default padding */
  display: flex;
  /* Use flexbox for layout */
  align-items: center;
  /* Align items vertically */
}
</style>
