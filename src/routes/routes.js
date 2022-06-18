import Home from "../pages/Home.vue";
import Admin from "../pages/Admin.vue";
import Provide from "../pages/Provide.vue";
import Login from "../pages/Login.vue";

const routes = [
  {
    path: "/",
    name: 'Inicio',
    component: Home,
  },
  {
    path: "/admin",
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      protectedLogin: true,
    }
  },
  {
    path: "/provider",
    name: 'Proveedor',
    component: Provide,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: 'Login',
    component: Login,
  },
];

export default routes