import { login } from '@/api/auth'
import { defineStore } from 'pinia'
import { notification } from 'ant-design-vue'
import { SmileOutlined } from '@ant-design/icons-vue'

import router from '@/router'
import { h } from 'vue'

export const useAuthStore = defineStore({
  id: 'auth',
  actions: {
    async login(payload) {
      try {
        const { user, token } = await login(payload)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('accessToken', token.accessToken)
        localStorage.setItem('refreshToken', token.refreshToken)
        console.log(user)
        notification.open({
          message: 'Đăng nhập thành công',
          description: `Xin chào ${user.firstName}, chúc bạn một ngày tốt lành!`,
          icon: h(SmileOutlined, { style: 'color: #108ee9' }),
          duration: 2
        })
        router.push('/')
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    logout() {
      localStorage.removeItem('user')
      notification.open({
        message: 'Đăng xuất thành công',
        description: `Tạm biệt, hãy đăng nhập nếu muốn tiếp tục!`,
        icon: h(SmileOutlined, { style: 'color: #108ee9' }),
        duration: 2
      })
      router.push('/sign-in')
    }
  }
})
