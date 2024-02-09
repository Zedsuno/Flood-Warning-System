<template>
    <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
      <!-- Section with four info areas left & one card right with image and waves -->
      <section class="py-7">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="row justify-content-start">
                <div class="col-md-6">
                  <div class="info">
                    <span class="fas fa-broadcast-tower text-3xl text-gradient text-info mb-3"></span>
                    <h5 class=h5-text>อัปเดตสถานีแบบเรียลไทม์</h5>
                    <p>"รับการอัปเดตสดๆ จากสถานีตรวจสอบเพื่อให้ทราบถึงระดับน้ำ, ทำให้สามารถจัดการกับน้ำท่วมได้อย่างรอบคอบและเป็นระบบ"</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="info">
                    <span class="fas fa-chart-line text-3xl text-gradient text-info mb-3"></span>
                    <h5 class=h5-text>กราฟข้อมูล</h5>
                    <p>"สำรวจกราฟที่แสดงข้อมูลระดับน้ำของสถานี  ณ ปัจจุบัน, ช่วยให้คุณสามารถมองเห็นแนวโน้มและเตรียมพร้อมสำหรับเหตุการณ์น้ำท่วมที่อาจเกิดขึ้น"</p>
                  </div>
                </div>
              </div>
              <div class="row justify-content-start mt-4">
                <div class="col-md-6">
                  <div class="info">
                    <span class="fas fa-map-location text-3xl text-gradient text-info mb-3"></span>
                    <h5 class="h5-text">แผนที่สถานีแบบโต้ตอบ</h5>
                    <p>"ใช้ประโยชน์จากแผนที่แบบไดนามิกที่มีโซนความเสี่ยงน้ำท่วม, เส้นทางอพยพ, และพื้นที่ที่ได้รับผลกระทบเพื่อทำความเข้าใจผลกระทบทางพื้นที่ของสภาวะน้ำท่วมได้ดียิ่งขึ้น"</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="info">
                    <span class="fas fa-circle-question g text-3xl text-gradient text-info mb-3"></span>
                    <h5 class=h5-text>คู่มือเตรียมความพร้อม</h5>
                    <p>"เข้าถึงแหล่งข้อมูลมากมายเกี่ยวกับการเตรียมพร้อมสำหรับน้ำท่วม , ขั้นตอนการรักษาความปลอดภัย และเทคนิคการลดผลกระทบ"</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 ms-auto mt-lg-0 mt-4">
              <div class="card">
                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <a class="d-block blur-shadow-image">
                    <img src="@/assets/Picture/search.jpg" alt="img-search" class="img-search border-radius-lg">
                  </a>
                </div>
                <div class="card-body text-center">
                  <h5 class="font-weight-normal">
                    <a class= "info-card-a" href="#">ค้นหาข้อมูลเชิงลึกสถานี</a>
                  </h5>
                  <p class="mb-0">
                    ประสบการณ์การใช้งานที่สะดวกสบายและรวดเร็ว ด้วยระบบแจ้งเตือนน้ำท่วมแบบเรียลไทม์ ช่วยให้รับมือได้ทันเวลาและห่างไกลจากน้ำท่วม"
                  </p>
                  <router-link to="/station" class="btn btn-info bg-gradient-info btn-sm mb-0 mt-3" role="button">
    ค้นหาเพิ่มเติม
  </router-link>                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
export default {
  name: "InfoSection",
  mounted() {
    this.initScrollEvents();
  },
  methods: {
    initScrollEvents() {
      // Initialize parallax and scroll animations
      window.addEventListener('scroll', this.handleScroll);
      this.animateElements();
    },
    handleScroll() {
      // Handle the parallax effect
      this.applyParallax();

      // Animate elements when in view
      this.animateElements();
    },
    applyParallax() {
      const bgParallax = document.querySelector('.page-header');
      if (bgParallax) {
        const oVal = window.scrollY / 3;
        bgParallax.style.transform = `translate3d(0, ${oVal}px, 0)`;
      }
    },
    animateElements() {
      const element = document.getElementById('count-stats');
      // Proceed only if element exists
      if (element) {
        const elementHeight = element.clientHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY || window.pageYOffset;
        const scrollPosition = scrollY + windowHeight;
        const elementPosition = element.getBoundingClientRect().top + scrollY + elementHeight;

        // Check if element is in view
        if (scrollPosition > elementPosition) {
          // Trigger animations
          this.startAnimations();
        }
      }
    },
    startAnimations() {
      // Check if the animations have already been completed
      if (!this.animateComplete) {
        return;
      }

      this.animateComplete = false; // Ensure animations are not repeated

      // Start the animations for different elements
      this.animateCounter('state1');
      this.animateCounter('state2');
      this.animateCounter('state3');
    },
    animateCounter(elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        const countTo = element.getAttribute("countTo");
        const countUp = new window.CountUp(elementId, countTo);
        if (!countUp.error) {
          countUp.start();
        } else {
          console.error(countUp.error);
        }
      }
    }
  },
  data() {
    return {
      animateComplete: true, // Track if the animation was completed
    };
  },
};
</script>

  
<style scoped>
.card.card-body.shadow-xl {
  margin-top: -60px; /* Adjust the margin-top as needed */
  z-index: 10; /* Keep the z-index to ensure it sits above other content */
  position: relative; /* Keep the position relative for z-index */
  border-radius: 1rem; /* Maintain the border-radius for rounded corners */
  border: none;
}

.card {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: none;
    border-radius: 1rem;
    
}

/* Adjust margins for medium devices */
.mx-md-4 {
  margin-right: 1.5rem ;
  margin-left: 1.5rem ;
}

/* Adjust negative margin-top */
.mt-n6 {
  margin-top: -4rem ;
}

/* Adjust margins for x-axis */
.mx-3 {
  margin-right: 1rem ;
  margin-left: 1rem; 
}

/* Define a stronger shadow for a 'lifted' effect */
.shadow-xl {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
}

/* Ensure proper padding within the card-body */
.card-body {
  flex: 1 1 auto;
  padding: var(--bs-card-spacer-y) var(--bs-card-spacer-x);
  color: var(--bs-card-color);
  
}

.card .card-header {
    padding: 1.5rem;

}


.z-index-2 {
    z-index: 2 !important;
}
.p-0 {
    padding: 0 !important;
}
.mt-n4 {
    margin-top: -1.5rem !important;
}
.mx-3 {
    margin-right: 1rem !important;
    margin-left: 1rem !important;
}
.position-relative {
    position: relative !important;
}

.info-card-a{
  letter-spacing: 0rem;
    color: #344767;
    text-decoration: none;
}

.info-card-a:hover{
    color: #11abcd;
 
}


.d-block.blur-shadow-image {
  display: block;
  width: auto;
  height: auto;
border-radius: 1rem;
}
.img-search.border-radius-lg {
  width: 100%;
  height: auto;
  border-radius: 1rem; /* This will give a border radius of 1rem, adjust if necessary */
}


/* Apply vertical padding */
.py-7 {
  padding-top: 6rem ;
  padding-bottom: 6rem ;
}

/* Center align items in the row */
.align-items-center {
  align-items: center;
}

/* Define column widths for medium devices */
.col-md-6 {
  flex: auto;
  width: 50%;
}

/* Define column widths for large devices */
.col-lg-6 {
  flex: 0 0 auto;
  width: 50%;
}

/* Additional styles based on the provided image */
.info  {
  text-align: left; /* Align text to the left */
  padding: 1rem; /* Add padding around the text */
  background-color: #ffffff; /* Set a white background */
  margin-bottom: 1rem; /* Add some space between the info blocks */
}

.h5-text {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 0.5rem;
}


.fas {
  color: #11abcd; /* Set the color of the icons */
  margin-bottom: 0.5rem; 
  font-size: 1.875rem;

}

.text-gradient {
  background: linear-gradient(to right, #11abcd 0%, #25adfc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}




.text-info {
  color: #17a2b8;
}

/* Additional responsive adjustments */
@media (max-width: 768px) {
  .row {
    flex-direction: column; /* Stack the columns on smaller screens */
  }
  .col-md-6, .col-lg-6 {
    width: 100%; /* Full width for small screens */
  }
  .mx-md-4, .mx-3 {
    margin-right: 0.5rem ;
    margin-left: 0.5rem ;
  }
}
.btn-info {
  background-image: linear-gradient(to right, #11abcd, #25adfc); /* Adjust the gradient colors as needed */
  border: none; /* No border for the button */
  color: white; /* Text color */
  padding: 10px 20px; /* Padding inside the button */
  font-size: 16px; /* Font size of the text */
  border-radius: 20px; /* Rounded corners */
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08); /* Box shadow for 3D effect */
  transition: all 0.2s; /* Smooth transition for hover effects */
}

.btn-info:hover {
  transform: translateY(-2px); /* Slightly raise the button on hover */
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08); /* Increase box shadow on hover */
}

.btn-info:active {
  transform: translateY(0); /* Button goes back to original state on click */
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08); /* Box shadow returns to normal on click */
}

.btn-info:focus {
  outline: none; /* Remove outline on focus for aesthetics */
}
</style>

  