import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    //重定向
    path: "/",
    redirect: Login,
  },
  {
    path: "/login",
    component: Login,
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
