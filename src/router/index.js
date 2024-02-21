import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../view/HomePage.vue';
import DefendFlood from '../view/DefendFlood.vue';
import FloodBook from '../view/FloodBook.vue';
import HisTory from '../view/HisTory.vue';
import FloodManage from '../view/FloodManage.vue';
import LoginPage from '../view/LoginPage.vue';
import RegisterPage from '../view/RegisterPage.vue';
import AdminPage from '../view/AdminPage.vue';
import AddStationPage from '../view/AddStationPage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/DefendFlood',
    name: 'DefendFlood',
    component: DefendFlood ,},
  {
    path: '/FloodBook',
    name: 'FloodBook',
    component: FloodBook
  }
,
  {
    path: '/HisTory',
    name: 'HisTory',
    component: HisTory,
  },

  {
    path: '/FloodManage',
    name: 'FloodManage',
    component: FloodManage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPage,
  },
  {
    path: '/admin/AddStation',
    name: 'AddStation',
    component: AddStationPage,
  },
{

}
  
  // ...more routes here
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});



export default router;
