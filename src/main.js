import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'jquery';
import 'popper.js';
import '@fortawesome/fontawesome-free/css/all.css';
import store from './store';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';



createApp(App)
  .use(router)
  .use(store) // Use the store
  .mount('#app');
