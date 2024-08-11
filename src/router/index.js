import { createRouter, createWebHistory } from "vue-router"
import HomePage from "../pages/HomePage.vue"
import store from "@/store/index.js"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage
    },
    {
      path: "/projects",
      name: "projects",
      component: () => import("../pages/ProjectsPage.vue")
    },
    {
      path: "/tasks",
      name: "tasks",
      component: () => import("../pages/TasksPage.vue")
    },
    {
      path: "/persons",
      name: "persons",
      component: () => import("../pages/PersonsPage.vue")
    },
    {
      path: "/newproject",
      name: "newproject",
      component: () => import("../pages/NewProjectPage.vue")
    }
  ]
})

export default router
