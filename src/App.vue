<template>
  <div id="app">
    <AppTopbar />
    <AppNavbar />
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
    AppNavbar
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
