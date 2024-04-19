@/assets/Logo/Logo (Replace).png"
<template>
  <section>
    <nav>
      <header>
        <div class="imgBx">
          <img src="@/assets/Logo/Logo (Replace).png" alt="logo">
          <h3>เตือนภัยน้ำท่วม<br><span>เชียงราย</span></h3>
        </div>
        <div class="toggle" @click="toggleNav">
          <i class="fa fa-chevron-right"></i>
          <i class="fa fa-chevron-left"></i>
        </div>
      </header>
      <menu>
        <ul>
          <li>
            <router-link to="/Admin" class="text-router-station">
              <i class="fa-solid fa-tower-cell"></i>
              <span>สถานี</span>
            </router-link>
          </li>
          <li>
            <router-link to="/account" class="text-router-Account">
              <i class="fa-solid fa-user"></i>
              <span>โปรไฟล์</span>
            </router-link>
          </li>
          <li>
            <a href="#">
              <i class="fa-solid fa-message"></i>
              <span>messages</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa-solid fa-circle-info"></i>
              <span>about</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa-solid fa-gear"></i>
              <span>setting</span>
            </a>
          </li>
        </ul>
        <div class="mode">
          <div class="icon">
            <router-link to="/">
              <i class="fa-solid fa-home"></i>
              <span>หน้าแรก</span>
            </router-link>
          </div>
          <div class="icon"  @click="logout">
            <a href="#">
              <i class="fa-solid fa-right-from-bracket"></i>
              <span>ออกจากระบบ</span>
            </a>
          </div>
        </div>
      </menu>
    </nav>
    
  </section>
</template>

<script>

export default {
  name: "Sidebar-AdminPage",
  methods: {
    logout() {
      // Clear the token from local storage
      localStorage.removeItem('token');

      // Redirect to the login page
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped> 

body {
    min-height: 100vh;
    background: #E4E9F7;
    transition:  all .5s ease;
}



section {
    display: flex;
    height: 100%;
    position: fixed;
    width: 300px;
    flex-direction: column;
    justify-content: space-between;

}

nav {
    background: #FFF;
    box-shadow: 0 2px 150px rgba(0, 0, 0, .2);
    height: 100%;
    padding: 25px;
    position: relative;
    transition:  all .5s ease;
    width: 250px;
}

nav.active {
    width: 100px;
}

header {
    align-items: center;
    display: flex;
    height: 70px;
    justify-content: center;
    position: relative;
    width: 100%;
}

.imgBx {
    align-items: center;
    display: flex;
    overflow: hidden;
    position: relative;
    width: 100%;
}

.imgBx img {
    border-radius: 10px;
    cursor: pointer;
    height: 50px;
    margin-right: 10px;
    object-fit: cover;
    position: relative;
    width: 50px;
}

h3 {
    color: #707070;
    font-size: 20px;
    font-weight: 500;
    line-height: 20px;
    text-transform: uppercase;
    transition:  all .5s ease;
}

h3 span {
    font-size: 15px;
    white-space: nowrap;
}

.toggle {
    align-items: center;
    background: #11abcd;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    cursor: pointer;
    display: flex;
    height: 30px;
    justify-content: center;
    position: absolute;
    right: -40px;
    width: 30px;
}

.toggle i {
    animation: animToggle .5s ease;
    color: #F6F5FF;
    filter: drop-shadow(0px 1px 3px 1px rgba(60, 64, 67, 0.15));
}

@keyframes animToggle {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

menu {
    display: flex;
    flex-direction: column;
    height: calc(100% - 70px);
    justify-content: space-between;
    overflow: hidden;
    position: relative;
    width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

ul {
    margin-top: 50px;
    position: relative;
    width: 100%;
}

li {
    align-items: center;
    border-radius: 10px;
    display: flex;
    height: 50px;
    margin-bottom: 5px;
    overflow: hidden;
    position: relative;
    width: 100%;
}

li:first-child {
    background: #E4E9F7;
}

.fa-magnifying-glass {
    align-items: center;
    cursor: pointer;
    display: flex;
    height: 50px;
    justify-content: center;
    margin-right: 10px;
    min-width: 50px;
    position: relative;
    width: 50px;
}

input {
    background: transparent;
    border: none;
    color:#707070;
    font-size: 18px;
    outline: none;
    padding-right: 15px;
    position: relative;
    transition: all .3s ease;
    width: calc(100% - 50px);
}

a  {
    align-items: center;
    display: flex;
    height: 100%;
    overflow: hidden;
    position: relative;
    text-decoration: none;
    transition:  all .5s ease;
    width: 100%;
}

a i.fa-solid {
    align-items: center;
    color: #707070;
    display: flex;
    font-size: 20px;
    height: 50px;
    justify-content: center;
    margin-right: 10px;
    min-width: 50px;
    position: relative;
    transition: all .3s ease;
    width: 50px;
}

a:hover {
    background: #11abcd;
    color: #F6F5FF;
}

a span {
    color: #707070;
    font-size: 20px;
    font-weight: 500;
    text-transform: capitalize;
    transition:all .3s ease;
}

.mode {
    position: relative;
    width: 100%;
}

.icon {
    border-radius: 10px;
    height: 50px;
    margin-bottom: 5px;
    overflow: hidden;
    position: relative;
    transition:all .3s ease;
    width: 100%;
}

.icon:hover {
    background: #11abcd;
}

.icon a {
    align-items: center;
    display: flex;
    height: 100%;
    position: relative;
    text-decoration: none;
    width: 100%;
}

.icon a i.fa-solid {
    align-items: center;
    color:#707070;
    display: flex;
    font-size: 20px;
    height: 50px;
    justify-content: center;
    margin-right: 10px;
    min-width: 50px;
    position: relative;
    transition: all .3s ease;
    width: 50px;
}

.icon a span {
    color: #707070;
    font-size: 20px;
    font-weight: 500;
    text-transform: capitalize;
    transition: all .3s ease;
}

.icon:hover a i.fa-solid,
.icon:hover a span {
    color: #F6F5FF;
}

.dayNight {
    align-items: center;
    background: #E4E9F7;
    border-radius: 10px;
    display: flex;
    height: 50px;
    position: relative;
    width: 100%;
}

.switch {
    align-items: center;
    display: flex;
    height: 50px;
    justify-content: center;
    margin-right: 10px;
    min-width: 50px;
    position: relative;
    width: 50px;
}

.switch .iconBx {
    align-items: center;
    background: #DDD;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    height: 35px;
    justify-content: center;
    overflow: hidden;
    position: relative;
    width: 35px;
}

.switch .iconBx i.fa-solid {
    animation: animToggle 1s ease;
    color: #707070;
    font-size: 20px;
    position: absolute;
    transition:all .3s ease;
}

.switchText {
    color: #707070;
    font-size: 20px;
    font-weight: 500;
    text-transform: capitalize;
    transition:  all .5s ease;
    white-space: nowrap;
}

</style>
