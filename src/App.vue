<template>
  <div id="app">
    <AppTopbar v-if="showTopbarAndNavbar" />
    <AppNavbar v-if="showTopbarAndNavbar" />
    <router-view />
  </div>
</template>

<script>
import AppTopbar from './components/AppTopbar.vue';
import AppNavbar from './components/AppNavbar.vue';

export default {
  name: 'App',
  components: {
    AppTopbar,
    AppNavbar,
},
  computed: {
    showTopbarAndNavbar() {
      // Add all paths where the top bar and navbar should not be shown
      const pathsWithoutTopbarAndNavbar = ['/login', '/Register', '/Admin'];
      return !pathsWithoutTopbarAndNavbar.includes(this.$route.path);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>