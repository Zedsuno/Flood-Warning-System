export default function authGuard(to, from, next) {
  const token = localStorage.getItem('token');
  console.log('Auth Guard called, token:', token);
  if (!token) {
    console.log('No token found, redirecting to login');
    next({ path: '/login' });
  } else {
    console.log('Token found, proceeding to route');
    next();
  }
}
