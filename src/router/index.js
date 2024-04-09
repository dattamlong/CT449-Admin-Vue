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
      name: 'Trang chủ',
      meta: {
        layout: 'dashboard'
      },
      component: () => import('../views/Home.vue')
    },
    {
      path: '/users',
      name: 'Tài khoản',
      meta: {
        layout: 'dashboard'
      },
      component: () => import('../views/Users.vue')
    },
    {
      path: '/books',
      name: 'Sách',
      meta: {
        layout: 'dashboard'
      },
      component: () => import('../views/Books.vue')
    },
    {
      path: '/profile',
      name: 'Trang cá nhân',
      meta: {
        layout: 'dashboard'
      },
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/sign-in',
      name: 'Sign in',
      component: () => import('../views/Sign-In.vue')
    }
  ]
})

export default router
