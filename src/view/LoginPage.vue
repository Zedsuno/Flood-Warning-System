<template>
  <body class="body-card">
    <div class="login-card-container">
      <div class="login-card">
        <div class="login-card-logo">
          <img src="@/assets/Logo/Logo (Replace).png" alt="logo" />
        </div>
        <div class="login-card-header">
          <h1>เข้าสู่ระบบเตือนภัยน้ำ</h1>
          <div>โปรดเข้าสู่ระบบเพื่อใช้งานระบบแอดมิน</div>
        </div>
        <form class="login-card-form" @submit.prevent="handleLogin">
          <div v-if="incorrectPassword" class="password-alert-login">
            รหัสผ่านไม่ถูกต้อง
          </div>
          <div v-if="userNotFound" class="password-alert-login">
            ไม่พบผู้ใช้ด้วยอีเมลนี้
          </div>
          <div class="form-item">
            <i class="fa fa-envelope form-item-icon"></i>
            <input
              type="email"
              placeholder="กรุณาระบุอีเมลล์"
              v-model="loginForm.email"
              autofocus
              required
            />
          </div>
          <div class="form-item">
            <i class="fa fa-lock form-item-icon"></i>
            <input
            :type="showPassword ? 'text' : 'password'"
              placeholder="กรุณาระบุรหัสผ่าน"
              v-model="loginForm.password"
              required
            />
            <PasswordVisibilityToggle :showPassword="showPassword" @update:showPassword="showPassword = $event" />

          </div>
          <div class="form-item-other">
            <div class="checkbox">
              <input
                type="checkbox"
                id="rememberMeCheckbox"
                v-model="loginForm.rememberMe"
                checked
              />
              <label for="rememberMeCheckbox">จดจำฉันไว้</label>
            </div>
            <router-link to="/forgot-password">ฉันลืมรหัสผ่าน!</router-link>
          </div>
          <button class ="button-login" type="submit">เข้าสู่ระบบ</button>
        </form>
        <div class="login-card-footer">
          ยังไม่มีบัญชีหรอ?
          <router-link to="/Register">สร้างบัญชีที่นี้.</router-link>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import axios from "axios";
import PasswordVisibilityToggle from "@/components/Login/PasswordVisibilityToggle.vue";


export default {
  components: {PasswordVisibilityToggle,
  },
  name: "LoginPage",
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      showPassword: false,
      incorrectPassword: false,
      userNotFound: false,
    };
  },
  methods: {
    toggleShowPassword() {
    this.$emit('update:showPassword', !this.showPassword);
  },
  async handleLogin() {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/login",
          this.loginForm
        );

        if (response.status === 200 && response.data.token) {
          localStorage.setItem("token", response.data.token);
          this.$router.push("/Admin");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            if (error.response.data.message === "Login failed: User not found") {
              this.userNotFound = true;
              this.incorrectPassword = false;
            } else if (error.response.data.message === "Login failed: Incorrect password") {
              this.incorrectPassword = true;
              this.userNotFound = false;
            }
          }
        } else {
          console.error("Login error", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.body-card {
  font-family: 'Prompt', sans-serif;
  min-height: 100vh;
  background: linear-gradient(to right, #11abcd, #f7eff5);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Login Card */
.login-card {
  width: 450px;
  background: rgba(255, 255, 255, 0.5);
  padding: 4rem;
  border-radius: 10px;
  position: relative;
  z-index: 1;
}

.login-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.16);
  transform: rotate(-6deg);
  border-radius: 10px;
  z-index: -1;
}
/* ---------- */

/* Login Card Logo */
.login-card-logo {
  margin-bottom: 2rem;
}

.login-card-logo img {
  width: 60px;
}
/* ---------- */

/* Login Card Standard */
.login-card-footer {
  text-align: center;
}

.login-card a {
  text-decoration: none;
  color: #35339a;
}

.login-card a:hover {
  text-decoration: underline;
}
/* ---------- */

/* Login Card Header */
.login-card-header {
  margin-bottom: 2rem;
}

.login-card-header h1 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.login-card-header h1 + div {
  font-size: calc(1rem * 0.8);
  opacity: 0.8;
}
/* ---------- */

/* Login Card Form */
.login-card-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.login-card-form .form-item {
  position: relative;
}

.login-card-form .form-item .form-item-icon {
  position: absolute;
  top: 1.2rem;
  left: 1.4rem;
  font-size: 1.3rem;
  opacity: 0.4;
}

.login-card-form .checkbox {
  display: flex;
  align-items: center;
  gap: 7px;
}

.login-card-form .form-item-other {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: calc(1rem * 0.8);
  margin-bottom: 0.5rem;
}
/* ---------- */

/* Login Card Footer */
.login-card-footer {
  margin-top: 1.5rem;
  font-size: calc(1rem * 0.8);
}
/* ---------- */

/* Login Card Form Elements */
.login-card input[type="text"],
.login-card input[type="password"],
.login-card input[type="email"] {
  border: none;
  outline: none;
  background: rgba(255, 255, 255, 0.3);
  padding: 1rem 1.5rem;
  padding-left: calc(1rem * 3.5);
  border-radius: 100px;
  width: 100%;
  transition: background 0.5s;
}

.login-card input:focus {
  background: white;
}

.login-card input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: black;
}

.login-card .button-login {
  background: black;
  color: white;
  padding: 1rem;
  border-radius: 100px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: background 0.5s;
}

.login-card .button-login:hover {
  background-color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
}
/* ---------- */

/* Login Card Social Buttons */
.login-card-social {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
  margin-top: 3rem;
}

.login-card-social > div {
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: calc(1rem * 0.8);
}

.login-card-social-btns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.login-card-social-btns a {
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 100px;
  transition: all 0.5s;
}
.password-alert-login {
  background-color: #ffcccc;
  color: #cc0000;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #ff6666;
  font-size: 0.875rem;
}
.login-card-social-btns a:hover {
  background-color: white;
  transform: scale(1.1);
}
/* ---------- */

/* Responsive */
@media (max-width: 768px) {
  body {
    padding: 2rem 0;
  }
  
  .login-card {
    width: 280px;
    padding: 2rem;
  }
}
/* ---------- */
</style>
