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
      path: "/people",
      name: "people",
      component: () => import("../pages/PersonsPage.vue")
    },
    {
      path: "/newproject",
      name: "newProject",
      component: () => import("../pages/NewProjectPage.vue")
    },
    {
      path: "/newproject/:id",
      name: "newProjectEdit",
      component: () => import("../pages/NewProjectPage.vue")
    },
    {
      path: "/newperson",
      name: "newPerson",
      component: () => import("../pages/NewPersonPage.vue")
    },
    {
      path: "/newtask",
      name: "newTask",
      component: () => import("../pages/NewTaskPage.vue")
    },
    {
      path: "/newtask/:id",
      name: "taskEdit",
      component: () => import("../pages/NewTaskPage.vue")
    },
    {
      path: "/newperson/:id",
      name: "personEdit",
      component: () => import("../pages/NewPersonPage.vue")
    }
  ]
})

export default router
