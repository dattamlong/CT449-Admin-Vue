<!-- 
	This is the dashboard layout, used in dashboard, tables, billing and profile pages.
 -->

<template>
  <div>
    <!-- Dashboard Layout -->
    <a-layout
      class="layout-dashboard"
      id="layout-dashboard"
      :class="[
        navbarFixed ? 'navbar-fixed' : '',
        !sidebarCollapsed ? 'has-sidebar' : '',
        layoutClass
      ]"
    >
      <!-- Main Sidebar -->
      <DashboardSidebar
        :sidebarCollapsed="sidebarCollapsed"
        :sidebarColor="sidebarColor"
        :sidebarTheme="sidebarTheme"
        @toggleSidebar="toggleSidebar"
      ></DashboardSidebar>

      <!-- Layout Content -->
      <a-layout>
        <DashboardHeader
          :sidebarCollapsed="sidebarCollapsed"
          :navbarFixed="navbarFixed"
          @toggleSettingsDrawer="toggleSettingsDrawer"
          @toggleSidebar="toggleSidebar"
        ></DashboardHeader>

        <a-layout-content>
          <router-view />
        </a-layout-content>

        <DashboardFooter />
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import DashboardSidebar from '../components/Sidebars/DashboardSidebar.vue'
import DashboardHeader from '../components/Headers/DashboardHeader.vue'
import DashboardFooter from '../components/Footers/DashboardFooter.vue'

export default {
  components: {
    DashboardSidebar,
    DashboardHeader,
    DashboardFooter
  },
  data() {
    return {
      // Sidebar collapsed status.
      sidebarCollapsed: false,

      // Main sidebar color.
      sidebarColor: 'primary',

      // Main sidebar theme : light, white, dark.
      sidebarTheme: 'light',

      // Header fixed status.
      navbarFixed: false,

      // Settings drawer visiblility status.
      showSettingsDrawer: false
    }
  },
  methods: {
    toggleSidebar(value) {
      this.sidebarCollapsed = value
    },
    toggleSettingsDrawer(value) {
      this.showSettingsDrawer = value
    },
    toggleNavbarPosition(value) {
      this.navbarFixed = value
    },
    updateSidebarTheme(value) {
      this.sidebarTheme = value
    },
    updateSidebarColor(value) {
      this.sidebarColor = value
    }
  },
  computed: {
    // Sets layout's element's class based on route's meta data.
    layoutClass() {
      return this.$route.meta.layoutClass
    }
  }
}
</script>
