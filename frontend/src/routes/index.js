import HomePage from '@/pages/HomePage';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';

const publicRoutes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login',
    component: Login,
    layout: null,
  },
  {
    path: '/register',
    component: SignUp,
    layout: null,
  },
];

export { publicRoutes };
