<template>
  <component :is="navbarFixed ? 'a-affix' : 'div'">
    <a-layout-header>
      <a-row type="flex">
        <a-col :span="24" :md="6">
          <a-breadcrumb>
            <a-breadcrumb-item><router-link to="/"> Trang</router-link></a-breadcrumb-item>
            <a-breadcrumb-item
              ><span>{{ this.$route.name }}</span></a-breadcrumb-item
            >
          </a-breadcrumb>

          <div class="ant-page-header-heading">
            <span class="ant-page-header-heading-title">{{ this.$route.name }}</span>
          </div>
        </a-col>

        <a-col :span="24" :md="18" class="header-control">
          <a-button
            type="link"
            class="sidebar-toggler"
            @click="$emit('toggleSidebar', !sidebarCollapsed)"
          >
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
              />
            </svg>
          </a-button>
          <a-button class="btn-sign-in" @click="handleLogout" type="text">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
                fill="#111827"
              />
            </svg>
            <span>Đăng xuất</span>
          </a-button>
        </a-col>
      </a-row>
    </a-layout-header>
  </component>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'

const props = defineProps(['navbarFixed', 'sidebarCollapsed'])

const handleLogout = () => {
  const authStore = useAuthStore()
  authStore.logout()
}
</script>
