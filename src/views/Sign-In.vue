<template>
  <div class="sign-in">
    <Particles />
    <a-row type="flex" :gutter="[24, 24]" justify="space-around" align="middle">
      <a-col
        :span="24"
        :md="12"
        :lg="{ span: 12, offset: 0 }"
        :xl="{ span: 6, offset: 2 }"
        class="col-form"
      >
        <a-typography-title>Đăng nhập</a-typography-title>
        <a-typography-title :level="5" class="font-regular text-muted"
          >Nhập email và mật khẩu để đăng nhập</a-typography-title
        >
        <!-- Sign In From -->
        <a-form
          id="form-login"
          layout="vertical"
          class="login-form"
          autoComplete="off"
          :hideRequiredMark="true"
          :model="formState"
          @submit="handleSubmit"
        >
          <a-form-item class="mb-10" label="Email" :colon="false">
            <a-input
              v-model:value="formState.email"
              v-decorator="[
                'email',
                { rules: [{ required: true, message: 'Please input your email!' }] }
              ]"
              placeholder="Email"
            >
            </a-input>
          </a-form-item>
          <a-form-item class="mb-5" label="Mật khẩu" :colon="false">
            <a-input
              v-model:value="formState.password"
              v-decorator="[
                'password',
                { rules: [{ required: true, message: 'Please input your password!' }] }
              ]"
              type="password"
              placeholder="Password"
            >
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" block html-type="submit" class="login-form-button">
              ĐĂNG NHẬP
            </a-button>
          </a-form-item></a-form
        >
      </a-col>
      <a-col :span="24" :md="12" :lg="12" :xl="12" class="col-img">
        <img src="../../public/images/book.png" alt="" />
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import Particles from '@/components/Particles/Particles.vue'
import { useAuthStore } from '@/stores/authStore'
import { reactive, ref } from 'vue'

const loading = ref(false)

const formState = reactive({
  email: 'datcold@gmail.com',
  password: '12345678'
})

const handleSubmit = async () => {
  loading.value = true
  try {
    const authStore = useAuthStore()
    await authStore.login(formState)
  } catch (error) {}
  loading.value = false
}
</script>

<style lang="scss">
body {
  background-color: #ffffff;
}
</style>
