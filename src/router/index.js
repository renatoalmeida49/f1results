import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home")
  },
  {
    path: "/results",
    name: "Results",
    component: () => import("@/views/Results")
  }
]

const router = new Router({
  mode: "history",
  routes,
});

export default router;