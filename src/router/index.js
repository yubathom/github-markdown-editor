import Vue from "vue";
import VueRouter from "vue-router";

import Store from "../store/index.js";

import LoginRepository from "../views/LoginRepository.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "home"
  },
  {
    path: "/login",
    name: "Login",
    component: LoginRepository,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/home",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  const isAuth = Store.state.access_token;

  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    to.path != "/login"
  ) {
    !isAuth
      ? next({
          path: "/login",
          query: { redirect: to.fullPath }
        })
      : next();
  } else if (to.path == "/login") {
    isAuth
      ? next({
          path: "/feed"
        })
      : next();
  } else {
    next();
  }
});

export default router;
