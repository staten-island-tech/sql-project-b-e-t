import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LogIn.vue')
    },
    {
      path: '/grades',
      name: 'Grades',
      component: () => import('../views/GradeDisplayView.vue')
    },
    {
      path: '/Attendance',
      name: 'Attendance',
      component: () => import('../views/AttendanceDisplay.vue')
    }
  ]
})

export default router
