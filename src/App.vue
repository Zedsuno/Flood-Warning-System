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
    // Add all route names where the top bar and navbar should not be shown
    const routesWithoutTopbarAndNavbar = ['login', 'register', 'AddStation', 'EditStation', 'admin' , 'Account','Alert','Hardware'];
    // Check if the current route name is not in the list of excluded routes
    return !routesWithoutTopbarAndNavbar.includes(this.$route.name);
  }

  }
};
</script>

<style>
#app {
  font-family: 'Prompt', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>