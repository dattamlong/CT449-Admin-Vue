import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/sign-in',
      name: 'Sign in',
      component: () => import('../views/Sign-In.vue')
    }
  ]
})

export default router
