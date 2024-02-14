<template>
    <footer class="footer">
      <div class="container">
        <div class="footer-columns">
          <div class="footer-column">
            <router-link to="/" exact class="footer-link">Home</router-link>
            <router-link to="/Map" class="footer-link">Map</router-link>
            <router-link to="/services" class="footer-link">Station</router-link>
            <router-link to="/portfolio-projects" class="footer-link">Riverview</router-link>
            <router-link to="/contact" class="footer-link">Contact</router-link>
          </div>
         
          <div class="footer-column contact-info">
            <div>Contact:</div>
            <div>Zedd.bunsua@hotmail.com</div>
            <a href="https://www.instagram.com/zedsu.no/" ><i  class="fab fa-instagram text-lg text-pink me-0"></i></a>
          </div>
          <div class="footer-column">
           
              <img class="footer-logo" src="https://assets-global.website-files.com/62838db5e5cc597190f9a798/6373fb5d482495b48e44b495_zorro-design-logo-image.png" alt="Zedsuno">
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
      name: 'FooterComponent',
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #fff; /* White background */
    color: #000; /* Black text color */
    padding-top: 3rem; /* Padding at the top */
    padding-bottom: 3rem; /* Padding at the bottom */
    display: flex;
    justify-content: center; /* Centers content horizontally */
    align-items: center; /* Centers content vertically */
    flex-direction: column; /* Stacks items vertically */
  }
  
  .footer-columns {
    display: flex;
    justify-content: space-around; /* Distributes space around items */
    align-items: flex-start; /* Aligns items to the start of the flex container */
    width: 100%; /* Full width */
    max-width: 1200px; /* Maximum width of the footer content */
  }
  
  .footer-column {
    display: flex;
    flex-direction: column;
    margin: 0 1rem; /* Spacing around each column */
  }
  
  .footer-link {
    color: #000; /* Black link color */
    margin-bottom: 0.5rem; /* Spacing between links */
    text-decoration: none; /* Removes underline from links */
    transition: color 0.3s; /* Smooth transition for color change */
  }
  
  .footer-link:hover {
    color: #11abcd; /* Blue color on hover */
  }
  
  .contact-info {
    font-size: 0.875rem; /* Smaller font size for contact info */
    color: #000; /* Grey color for contact info */
    display: flex; /* Align contact info items */
    flex-direction: column; /* Stack contact info vertically */
  }
  
 
  
  .footer-logo  {
    width: auto; /* Auto width for responsive logo size */
    height: 100px; /* Fixed height for the logo */
    margin-top: 1rem; /* Space above the logo */
  }

  .fab{
    font-size: 2rem;
  margin-top: 20px;
  color: #11abcd;
  }
  
  @media (max-width: 768px) {
    .footer-columns {
      flex-direction: column; /* Stack columns vertically on mobile */
      align-items: center; /* Center align items on mobile */
    }
  
    .footer-column {
      margin-bottom: 1rem; /* Space between columns on mobile */
    }
  }
  </style>