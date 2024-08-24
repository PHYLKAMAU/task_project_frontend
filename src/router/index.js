import { createRouter, createWebHistory } from 'vue-router'
import SplashScreenView from '../views/SplashScreenView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'SplashScreen',
      component: SplashScreenView,
    },
   
  ]
})

export default router
