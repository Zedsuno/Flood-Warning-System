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
                      <h1 class="text-h1">วิธีการป้องกันน้ำท่วม</h1>
                      <p class="lead mb-16 text-p opacity-8">
                          วิธีการป้องกันและเตรียมรับมือกับสถานการณ์น้ำท่วม
                      </p>
                  </div>
              </div>
          </div>
      </div>
  </header>

  <div class="history">
      <div class="grid-container">
          <nav class="breadcrumb" role="navigation" aria-labelledby="system-breadcrumb">
              <h2 id="system-breadcrumb" class="visually-hidden">Breadcrumb</h2>
              <ol>
                  <li>
                      <a href="/" previewlistener="true">หน้าแรก</a>
                  </li>
                  <li>
                    วิธีการป้องกันน้ำท่วม
                  </li>
              </ol>
          </nav>

          <!-- card content -->
          <article class="flood-article">
        <!-- Insert your flood article content here -->
        <section>
          <p>
            การป้องกันน้ำท่วมเป็นเรื่องที่สำคัญมากในบริบทที่มีปัญหาเกี่ยวกับน้ำท่วมอย่างต่อเนื่อง 
            การจัดการและการป้องกันน้ำท่วมไม่เพียงแต่ช่วยลดความเสียหายที่เกิดขึ้นจากน้ำท่วม 
            แต่ยังช่วยเพิ่มความปลอดภัยและความมั่นคงในชีวิตประจำวันของประชากร
          </p>
          <p><strong>วิธีเตรียมรับมือน้ำท่วมอย่างปลอดภัย:</strong></p>
          <ul>
            <li>ติดตามข่าวสาร สถานการณ์น้ำท่วมจากหน่วยงานที่เกี่ยวข้อง และปฏิบัติตามคำแนะนำอย่างเคร่งครัด</li>
            <li>หากอยู่ในพื้นที่เสี่ยง ควรเตรียมกระสอบทรายเพื่อใช้อุดปิดทางที่น้ำจะไหลเข้าบ้าน</li>
            <li>เตรียมยกของขึ้นบนพื้นที่สูงให้พ้นจากระดับน้ำท่วม</li>
            <li>เรียนรู้เส้นทางการอพยพไปที่ปลอดภัยในพื้นที่น้ำท่วมไม่ถึง</li>
            <li>รู้หมายเลขโทรศัพท์ฉุกเฉินของหน่วยงานท้องถิ่น</li>
            <li>เตรียมอุปกรณ์สิ่งจำเป็นต่างๆให้พร้อม เช่นื โทรศัพท์มือถือ อุปกรณ์ทำความสะอาด อาหารแห้ง น้ำดื่มสะอาด ยารักษาโรค เป็นต้น</li>
            <li>ถอดปลั๊กเครื่องใช้ไฟฟ้า ยกเบรกเกอร์ ปิดบ้านให้เรีอบร้อยก่อนออกจากบ้าน</li>
          </ul>

          <p>&nbsp;<strong>สิ่งที่ต้องระวัง！</strong></p>
          <ul>
            <li>งดเล่นน้ำ หรืออยู่ใกล้ทางน้ำหลาก</li>
            <li>ห้ามขับรถเข้าไปในพื้นที่น้ำท่วม หรือบริเวณที่มีน้ำหลาก ให้ออกจากรถและไปอยู่ที่สูงทันที</li>
            <li>สอนให้เด็กเล็กป้องกันตนเองจากอันตราย เช่น ขณะน้ำท่วมไม่สัมผัสปลั๊กไฟ หรือเครื่องใช้ไฟฟ้า</li>
            <li>ศึกษาแผนฉุกเฉินของพื้นที่ เพื่อเตรียมความพร้อม</li>
          </ul>

                  <div class="card-content">
                      <div class="content-header">
                          <nav class="breadcrumb" role="navigation" aria-labelledby="system-breadcrumb">
                              <h2 id="system-breadcrumb" class="visually-hidden">Breadcrumb</h2>
                              <ol>
                              </ol>
                          </nav>
                      </div>
                     <div class="history-article">
                          <div>
                              <img src="https://img.kapook.com/u/2021/Jarosphan/Home/applicance/214824/01.jpg" width="480" height="395"
                                  alt="Cleanning after flood. " typeof="foaf:Image" class="image-style-large" />
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
.flood-article ul {
  list-style-type: disc;
  padding-inline-start: 40px;
  /* Adjust this value as needed to align with your design */
  margin-left: 0;
  /* Aligns the bullet points to the edge of the container */
}

.flood-article ul li {
  text-align: left;
  /* Ensures that the text is aligned to the left */
  padding-left: 0;
  /* Removes any padding that may offset the text from the left edge */
  margin-bottom: 0.5rem;
  /* Adjust the space between list items if necessary */
}

.flood-article p {
  text-align: left;
  padding-left: 0;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

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
  content: '>';
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
