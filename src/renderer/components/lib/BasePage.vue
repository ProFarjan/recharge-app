<template>
  <div :class="'app-admin-wrap layout-sidebar-vertical ' + $root.$data.sidebarAnimation">
    <sidebar v-if="auth" />
    <div v-if="auth" class="switch-overlay" />
    <div class="main-content-wrap mobile-menu-content bg-off-white m-0">
      <page-header v-if="auth" />
      <div class="separator-breadcrumb border-top" />
      <slot />
      <page-footer v-if="auth" />
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar'
import PageHeader from './PageHeader'
import PageFooter from './PageFooter'
export default {
  name: 'BasePage',
  components: {PageHeader, PageFooter, Sidebar},
  data: () => ({
    auth: localStorage.getItem('user')
  })
}
</script>

<style scoped>

</style>
