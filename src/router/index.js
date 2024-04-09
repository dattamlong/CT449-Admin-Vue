import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/:catchAll(.*)',
      component: () => import('../views/404.vue')
    },
    {
      path: '/',
      name: 'Home',
      layout: 'dashboard',
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
