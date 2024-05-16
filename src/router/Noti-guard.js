import router from './router' // Your Vue router instance
import store from '../store/index' // Your Vuex store instance
import Swal from 'sweetalert2'

router.beforeEach((to, from, next) => {
  if (store.state.isLinking) {
    Swal.fire({
      title: 'You have unsaved changes!',
      text: "Are you sure you want to leave without saving?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, leave without saving!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        store.commit('RESET_LINKING_STATE');
        next();
      } else {
        next(false); // Prevents the navigation
      }
    });
  } else {
    next(); // Proceed as normal if there are no unsaved changes
  }
});