import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../view/HomePage.vue';
import DefendFlood from '../view/DefendFlood.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/DefendFlood',
    name: 'DefendFlood',
    component: DefendFlood ,
  },
  
  // ...more routes here
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
