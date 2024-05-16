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
import StationPage from '../view/StationPage.vue';
import WaterResource from '../view/WaterResource.vue';
import MapPage from "../view/MapPage.vue";
import AccountPage from '../view/AccoutPage.vue';
import authGuard from '@/router/auth-guard';
const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/DefendFlood',
    name: 'DefendFlood',
    component: DefendFlood,
  },
  {
    path: '/FloodBook',
    name: 'FloodBook',
    component: FloodBook
  }
  ,
  {
    path: '/WaterResource',
    name: 'WaterResource',
    component: WaterResource,
  },
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
    path: '/Admin',
    name: 'admin',
    component: AdminPage,
    beforeEnter: authGuard
  },
  {
    path: '/admin/AddStation',
    name: 'AddStation',
    component: AddStationPage,
    props: false
  },
  {
    path: '/station/:stationId', // Notice the :stationId parameter
    name: 'Station',
    component: StationPage,
    props: true // Enables the route to pass the stationId as a prop to the component
  },

  {
    path: '/admin/edit-station/:stationId',
    name: 'EditStation',
    component: AddStationPage , // If you are using the same component for add and edit
    props: (route) => ({ isEditMode: true, stationId: route.params.stationId })
  },
{
  path: '/Map',
  name: 'MapPage',
  component: MapPage,
},
{
  path: '/Account',
  name: 'Account',
  component: AccountPage,
}
  

  // ...more routes here
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});



export default router;
