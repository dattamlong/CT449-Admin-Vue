<template>
  <a-layout-header>
    <div class="header-col header-brand">
      <h6>ColdBook</h6>
    </div>
  </a-layout-header>
</template>

<script>
export default {
  data() {
    return {
      collapseNav: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-link svg {
  margin-right: 5px;
  vertical-align: middle;
}
.nav-link span {
  vertical-align: middle;
}
.ant-menu-submenu-popup {
  width: 100%;
}
</style>
