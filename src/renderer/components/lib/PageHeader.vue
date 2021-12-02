<template>
  <header class="main-header bg-white d-flex justify-content-between p-2">
    <div class="header-toggle">
      <div class="menu-toggle mobile-menu-icon" @click="mobileSideBar">
        <div />
        <div />
        <div />
      </div>
      <strong style="font-size: 18px;font-weight: 700;font-style: italic;" ref="wubHeader">DevFarjan</strong>
    </div>
    <div class="header-part-right">
      <b-avatar
          variant="info"
          src="https://th.bing.com/th/id/R.1af3b0033644a60b844ee5abdcca8900?rik=HODvUGpz4KyXtw&pid=ImgRaw&r=0"
          class="mr-3"
      />

      <!-- Full screen toggle-->
      <i
          v-if="showFSButton"
          class="i-Full-Screen header-icon d-none d-sm-inline-block"
          @click="fullscreenApps"
      />
      <!-- Grid menu Dropdown-->
      <div class="dropleft">
        <i
            id="dropdownMenuButton"
            class="i-Power-3 text-muted header-icon"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            @click.prevent="logOut"
        />
      </div>
    </div>
  </header>
</template>

<script>

export default {
  name: 'PageHeader',
  data: () => ({
    showFSButton: false,
    elem: document.documentElement,
    screenController: true,
    mobileMenu: false
  }),
  created () {
    if (document.fullscreenEnabled) {
      this.showFSButton = true
    }
  },
  mounted () {
    if (screen.width < 608) {
      this.$refs['wubHeader'].innerText = 'devFarjan'
    } else {
      this.$refs['wubHeader'].innerText = 'Recharge Software'
    }
  },
  methods: {
    logOut () {
      localStorage.clear()
      this.$router.push('/')
      this.$root.$data.sidebarAnimation = 'sidebar-full'
    },
    fullscreenApps () {
      if (document.fullscreenEnabled && this.screenController) {
        this.openFullscreen()
        this.screenController = false
      } else {
        this.closeFullscreen()
        this.screenController = true
      }
    },
    openFullscreen () {
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen()
      } else if (this.elem.webkitRequestFullscreen) {
        this.elem.webkitRequestFullscreen()
      } else if (this.elem.msRequestFullscreen) {
        this.elem.msRequestFullscreen()
      }
    },
    closeFullscreen () {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    },
    mobileSideBar () {
      if (this.mobileMenu) {
        this.$root.$data.sidebarAnimation = ''
        this.mobileMenu = false
      } else {
        this.$root.$data.sidebarAnimation = 'sidebar-compact-onhover sidebar-closed sidebar-compact'
        this.mobileMenu = true
      }
    }
  }
}
</script>

<style>
@media screen and (max-width: 1150px) {
  .switch-overlay {
    display: none !important;
  }
}
</style>
