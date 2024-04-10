import { useAuthStore } from '@/stores/authStore'
import Books from '@/views/Books.vue'
import Dashboard from '@/views/Dashboard.vue'
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'
import SignIn from '@/views/Sign-In.vue'
import UserEdit from '@/views/UserEdit.vue'
import Users from '@/views/Users.vue'
import { notification } from 'ant-design-vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/:catchAll(.*)',
      component: () => import('../views/404.vue')
    },
    {
      path: '/sign-in',
      name: 'Sign in',
      component: SignIn
    },

    {
      path: '/',
      name: 'Trang chủ',
      meta: {
        layout: 'dashboard'
      },
      component: Home,
      children: [
        {
          path: '',
          name: 'Trang chủ',
          component: Dashboard
        },
        {
          path: 'users',
          name: 'Tài khoản',
          component: Users
        },
        {
          path: 'users/:id',
          name: 'Chỉnh sửa tài khoản',
          component: UserEdit
        },
        {
          path: 'books',
          name: 'Sách',
          component: Books
        },
        {
          path: 'profile',
          name: 'Trang cá nhân',
          component: Profile
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  const publicPages = ['/sign-in']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()

  if (authRequired && !auth.user) {
    notification.error({
      message: 'Truy cập thất bại',
      description: 'Vui lòng đăng nhập lại.',
      duration: 2
    })
    auth.returnUrl = to.fullPath
    return '/sign-in'
  }

  if (to.path === '/sign-in' && auth.user) {
    return '/'
  }
})

export default router
