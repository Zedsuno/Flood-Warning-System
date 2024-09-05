

<template>
  <section>
    <nav>
      <header>
        <div class="imgBx">
          <img src="@/assets/Logo/Logo (Replace).png" alt="logo" />
          <h3>เตือนภัยน้ำท่วม<br /><span>เชียงราย</span></h3>
        </div>
        
      </header>
      <menu>
        <ul>
          <li v-for="(item, index) in menuItems" :key="index">
            <router-link :to="item.path" class="text-router-station" active-class="active">
              <i :class="item.icon"></i>
              <span>{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
        <div class="mode">
          <div class="icon">
            <router-link to="/">
              <i class="fa-solid fa-home"></i>
              <span>หน้าแรก</span>
            </router-link>
          </div>
          <div class="icon" @click="logout">
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
  data() {
    return {
      menuItems: [
        { label: "สถานี", path: "/Admin", icon: "fa-solid fa-tower-cell" },
        // { label: "โปรไฟล์", path: "/Account", icon: "fa-solid fa-user" },
        { label: "ประวัติเตือนภัย", path: "/Admin/Alert", icon: "fa-solid fa-bell" },
        { label: "เพิ่มอุปกรณ์", path: "/Admin/Hardware", icon: "fa-solid fa-plus" },
      ],
      activeIndex: null,
    };
  },
  methods: {
    setActive(index) {
      this.activeIndex = index;
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    toggleNav() {
      // Toggle logic here
    },
  },
};
</script>

<style scoped>
body {
  min-height: 100vh;
  background: #e4e9f7;
  transition: all 0.5s ease;
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
  background: #fff;
  box-shadow: 0 2px 150px rgba(0, 0, 0, 0.2);
  height: 100%;
  padding: 25px;
  position: relative;
  transition: all 0.5s ease;
  width: 250px;
}

nav.active {
  width: 100px;
}

header {
  align-items: center;
  display: flex;
  height: 80px;
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
  transition: all 0.5s ease;
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
  animation: animToggle 0.5s ease;
  color: #f6f5ff;
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
  font-family: "Poppins", sans-serif;
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
  cursor: pointer;
  transition: background-color .3s;
}


li .active {
  background: #e4f6f7; /* This will apply to <router-link> elements */
}

/* Ensure the style is applied directly to the router-link within li */
li .text-router-station.active {
  background: #e4f6f7; /* Active state styling */
  display: flex; /* To ensure the style covers the entire li space */
  width: 100%; /* Cover the full width of the li */
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
  color: #707070;
  font-size: 18px;
  outline: none;
  padding-right: 15px;
  position: relative;
  transition: all 0.3s ease;
  width: calc(100% - 50px);
}

a {
  align-items: center;
  display: flex;
  height: 100%;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  transition: all 0.5s ease;
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
  transition: all 0.3s ease;
  width: 50px;
}

a:hover {
  background: #11abcd;
  color: #f6f5ff;
}

a span {
  color: #707070;
  font-size: 20px;
  font-weight: 500;
  text-transform: capitalize;
  transition: all 0.3s ease;
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
  transition: all 0.3s ease;
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
  color: #707070;
  display: flex;
  font-size: 20px;
  height: 50px;
  justify-content: center;
  margin-right: 10px;
  min-width: 50px;
  position: relative;
  transition: all 0.3s ease;
  width: 50px;
}

.icon a span {
  color: #707070;
  font-size: 20px;
  font-weight: 500;
  text-transform: capitalize;
  transition: all 0.3s ease;
}

.icon:hover  i.fa-solid,
.icon:hover  span
{
  color: #f6f5ff;
}


.text-router-station:hover  i.fa-solid,
.text-router-station:hover  span
{
  color: #f6f5ff;
}

.active:hover  i.fa-solid,
.active:hover  span
{
  color: #707070;
}
</style>
