import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../view/HomePage.vue';
import LoginPage from '../view/LoginPage.vue';
import AdminPage from '../view/AdminPage.vue';
import RegisterPage from '../view/RegisterPage.vue';
import FloodBook from '../view/FloodBook.vue';


const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  }
  ,
  {
    path: '/Admin',
    name: 'AdminPage',
    component: AdminPage
  }
  ,{
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  }
  ,{
    path: '/FloodBook',
    name: 'FloodBook',
    component: FloodBook
  }
  
  // ...more routes here
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
