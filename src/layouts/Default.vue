<template>
  <div>
    <a-layout class="layout-default" id="layout-default" :class="[layoutClass]">
      <DefaultHeader />
      <a-layout-content>
        <Particles />
        <router-view />
      </a-layout-content>
      <DefaultFooter />
    </a-layout>
  </div>
</template>

<script>
import DefaultHeader from '../components/Headers/DefaultHeader.vue'
import DefaultFooter from '../components/Footers/DefaultFooter.vue'
import Particles from '../components/Particles/Particles.vue'

export default {
  components: {
    Particles,
    DefaultHeader,
    DefaultFooter
  },
  data() {
    return {}
  },
  computed: {
    // Sets layout's element's class based on route's meta data.
    layoutClass() {
      return this.$route.meta.layoutClass
    }
  }
}
</script>
