import { createRouter, createWebHistory } from 'vue-router'
import SplashScreenView from "@/views/SplashScreenView.vue";
import TaskListView from "@/views/TaskListView.vue";
import TaskView from "@/views/TaskView.vue";
// import TaskFormView from "@/views/TaskFormView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: SplashScreenView
    },
    {
      path: '/tasks',
      component: TaskListView,
    },
    {
      path: '/tasks/:id',
      component: TaskView,
    },
    // {
    //   path: '/tasks/new',
    //   component: TaskFormView,
    // },
    // {
    //   path: '/tasks/:id/edit',
    //   name: 'TaskEdit',
    //   component: TaskFormView,
    // },
    // {
    //   path: '/tasks/:id',
    //   name: 'TaskDetail',
    //   component: TaskDetailView,
    // },
  ]
})

export default router
