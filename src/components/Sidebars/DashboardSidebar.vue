<template>
  <a-layout-sider
    collapsible
    class="sider-primary"
    breakpoint="lg"
    collapsed-width="0"
    width="250px"
    :collapsed="sidebarCollapsed"
    @collapse="$emit('toggleSidebar', !sidebarCollapsed)"
    :trigger="null"
    :class="['ant-layout-sider-' + sidebarColor, 'ant-layout-sider-' + sidebarTheme]"
    theme="light"
    :style="{ backgroundColor: 'transparent' }"
  >
    <div class="brand"><span>ColdBook</span> <span></span></div>
    <hr />

    <a-menu theme="light" mode="inline">
      <a-menu-item>
        <router-link to="/users">
          <span class="icon">
            <UserOutlined />
          </span>
          <span class="label">Tài khoản</span>
        </router-link>
      </a-menu-item>
      <a-menu-item>
        <router-link to="/books">
          <span class="icon">
            <BookOutlined />
          </span>
          <span class="label">Sách</span>
        </router-link>
      </a-menu-item>
      <a-menu-item>
        <router-link to="/borrows">
          <span class="icon">
            <SwitcherOutlined />
          </span>
          <span class="label">Mượn sách</span>
        </router-link>
      </a-menu-item>
      <a-menu-item>
        <router-link to="/publishers">
          <span class="icon">
            <SwitcherOutlined />
          </span>
          <span class="label">Nhà xuất bản</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
import { UserOutlined, BookOutlined, SwitcherOutlined } from '@ant-design/icons-vue'
const props = defineProps(['sidebarCollapsed', 'sidebarColor', 'sidebarTheme'])
</script>
