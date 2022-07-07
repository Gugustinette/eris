import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PolicyView from "../views/PolicyView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/policy",
    name: "policy",
    component: PolicyView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
