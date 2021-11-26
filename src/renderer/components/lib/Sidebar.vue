<template>
  <div
      class="sidebar-panel bg-white"
      @mouseover="sidebarCollapsed"
      @mouseleave="sidebarOpen"
  >
    <div class="gull-brand pr-3 text-center mt-4 mb-2 d-flex justify-content-center align-items-center">
      <img
          class="pl-3"
          src="https://th.bing.com/th/id/R.4d43102038bd632b68cb1ebae849959f?rik=qcTyvQTVN0FpoA&pid=ImgRaw&r=0"
          alt="alt"
      >
      <span class=" item-name text-20 text-primary font-weight-700">devFarjan</span>
      <div
          class="sidebar-compact-switch ml-auto"
          @click="sidebarCompact"
      >
        <span />
      </div>
    </div>
    <!--  user -->
    <div
        class="scroll-nav ps ps--active-y"
        data-perfect-scrollbar="data-perfect-scrollbar"
        data-suppress-scroll-x="true"
    >
      <VuePerfectScrollbar
          class="scroll-area"
          :settings="settings"
      >
        <div class="side-nav">
          <div class="main-menu">
            <ul
                id="menu"
                class="metismenu"
            >
              <li
                  class="Ul_li--hover"
              >
                <router-link
                    aria-expanded="false"
                    to="/dashboard"
                >
                  <i class="i-Bar-Chart text-20 mr-2 text-muted" /><span
                    class="item-name text-15 text-muted"
                    title="Ctrl+Shift+D"
                >Dashboard</span>
                </router-link>
              </li>
              <li
                  class="Ul_li--hover"
              >
                <router-link
                    aria-expanded="false"
                    to="/recharge"
                >
                  <i class="i-Money-2 text-20 mr-2 text-muted" /><span
                    class="item-name text-15 text-muted"
                    title="Ctrl+Shift+L"
                >Recharge</span>
                </router-link>
              </li>
              <li
                  class="Ul_li--hover"
              >
                <router-link
                    aria-expanded="false"
                    to="/banking"
                >
                  <i class="i-Students text-20 mr-2 text-muted" /><span
                    class="item-name text-15 text-muted"
                    title="Ctrl+Shift+S"
                >Sent Money</span>
                </router-link>
              </li>
              <li
                  class="Ul_li--hover"
              >
                <router-link
                    aria-expanded="false"
                    to="/banking"
                >
                  <i class="i-Students text-20 mr-2 text-muted" /><span
                    class="item-name text-15 text-muted"
                    title="Ctrl+Shift+S"
                >Received Money</span>
                </router-link>
              </li>
              <li class="Ul_li--hover">
                <a class="has-arrow" href="#" aria-expanded="false">
                  <i class="i-Library text-20 mr-2 text-muted"></i>
                  <span class="item-name text-15 text-muted">Reports</span>
                </a>
                <ul class="mm-collapse" style="height: 0px;">
                  <li class="item-name"><a href="alerts.html"><i class="nav-icon i-Bell1"></i><span class="item-name">Today's Report</span></a></li>
                  <li class="item-name"></li>
                  <li class="nav-item"><a href="dropdown.html"><i class="nav-icon i-Bell1"></i><span class="item-name">Recharge Records</span></a></li>
                  <li class="item-name"><a href="buttons.html"><i class="nav-icon i-Cursor-Click"></i><span class="item-name">Banking Records</span></a></li>
                  <li class="item-name"><a href="cards.html"><i class="nav-icon i-Line-Chart-2"></i><span class="item-name">Statement</span></a></li>
                  <li class="item-name"><a href="card.metrics.html"><i class="nav-icon i-ID-Card"></i><span class="item-name">Balance Sheet</span></a></li>
                </ul>
              </li>
              <li
                  class="Ul_li--hover"
              >
                <router-link
                    aria-expanded="false"
                    to="/bank_reconciliation"
                >
                  <i class="i-Bank text-20 mr-2 text-muted" /><span
                    class="item-name text-15 text-muted"
                    title="Ctrl+Shift+B"
                >Setting</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </VuePerfectScrollbar>

      <div
          class="ps__rail-x"
          style="left: 0px; bottom: 0px;"
      >
        <div
            class="ps__thumb-x"
            tabindex="0"
            style="left: 0px; width: 0px;"
        />
      </div>
      <div
          class="ps__rail-y"
          style="top: 0px; height: 404px; right: 0px;"
      >
        <div
            class="ps__thumb-y"
            tabindex="0"
            style="top: 0px; height: 325px;"
        />
      </div>
      <div
          class="ps__rail-x"
          style="left: 0px; bottom: 0px;"
      >
        <div
            class="ps__thumb-x"
            tabindex="0"
            style="left: 0px; width: 0px;"
        />
      </div>
      <div
          class="ps__rail-y"
          style="top: 0px; height: 404px; right: 0px;"
      >
        <div
            class="ps__thumb-y"
            tabindex="0"
            style="top: 0px; height: 325px;"
        />
      </div>
    </div>
    <!--  side-nav-close -->
  </div>
</template>

<script>
import MetisMenu from 'metismenujs'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  name: 'Sidebar',
  components: {
    VuePerfectScrollbar
  },
  data: () => ({
    logo: '',
    settings: {
      maxScrollbarLength: 60
    },
    sidebarHelper: -1,
    userPermission: []
  }),
  mounted () {
    MetisMenu.attach('#menu', {
      toggle: false
    })
  },
  methods: {
    sidebarCompact () {
      if (this.sidebarHelper === -1) {
        this.$root.$data.sidebarAnimation = 'sidebar-compact-onhover sidebar-closed sidebar-compact'
        this.sidebarHelper = 0
      } else if (this.sidebarHelper === 1) {
        this.$root.$data.sidebarAnimation = 'sidebar-full'
        this.sidebarHelper = -1
      }
    },
    sidebarCollapsed () {
      if (this.$root.$data.sidebarAnimation === 'sidebar-compact-onhover sidebar-closed sidebar-compact' && this.sidebarHelper === 1) {
        this.$root.$data.sidebarAnimation = 'sidebar-compact-onhover sidebar-full'
      }
    },
    sidebarOpen () {
      if (this.sidebarHelper === 0) {
        this.sidebarHelper = 1
      } else if (this.sidebarHelper === 1) {
        this.$root.$data.sidebarAnimation = 'sidebar-compact-onhover sidebar-closed sidebar-compact'
      }
    }
  }
}
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/metismenujs/dist/metismenujs.min.css";
.scroll-area {
  position: relative;
  margin: auto;
  height: 96vh;
}
</style>
