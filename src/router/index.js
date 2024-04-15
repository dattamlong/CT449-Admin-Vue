import { useAuthStore } from '@/stores/authStore'
import Books from '@/views/BookList.vue'
import Dashboard from '@/views/Dashboard.vue'
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'
import SignIn from '@/views/Sign-In.vue'
import UserCreate from '@/views/UserCreate.vue'
import UserEdit from '@/views/UserEdit.vue'
import BookCreate from '@/views/BookCreate.vue'
import Users from '@/views/UserList.vue'
import { notification } from 'ant-design-vue'
import { createRouter, createWebHistory } from 'vue-router'
import BookEdit from '@/views/BookEdit.vue'

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
          component: Users,
          children: []
        },
        {
          path: 'users/:id',
          name: 'Chỉnh sửa tài khoản',
          component: UserEdit,
          meta: {
            layoutClass: 'layout-profile'
          }
        },
        {
          path: 'users/create',
          name: 'Thêm tài khoản',
          component: UserCreate,
          meta: {
            layoutClass: 'layout-profile'
          }
        },
        {
          path: 'books',
          name: 'Sách',
          component: Books
        },
        {
          path: 'books/create',
          name: 'Thêm sách',
          component: BookCreate,
          meta: {
            layoutClass: 'layout-profile'
          }
        },
        {
          path: 'books/:id',
          name: 'Chỉnh sửa sách',
          component: BookEdit,
          meta: {
            layoutClass: 'layout-profile'
          }
        },
        {
          path: 'profile',
          name: 'Trang cá nhân',
          component: Profile,
          meta: {
            layoutClass: 'layout-profile'
          }
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
