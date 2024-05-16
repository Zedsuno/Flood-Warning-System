import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';  // Ensure this path is correct

// Importing CSS and JS libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'jquery';
import 'popper.js';
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App);
app.use(router);  // First apply the router
app.use(store);   // Then apply the Vuex store
app.mount('#app');  // Finally, mount the app