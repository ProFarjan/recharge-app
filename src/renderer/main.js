import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import VueCompositionAPI from '@vue/composition-api'
import VueLadda from 'vue-ladda'
import { BootstrapVue } from 'bootstrap-vue'
import vSelect from 'vue-select'
import VeeValidate from 'vee-validate'
import Notifications from 'vue-notification'
import global from './config/global'

import 'vue-select/dist/vue-select.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const VueInputMask = require('vue-inputmask').default

Vue.prototype.$screenSize = screen.width

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueCompositionAPI)
Vue.component('vue-ladda', VueLadda)
Vue.component('v-select', vSelect)
Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: 'veeFields',
  errorBagName: 'veeErrors'
})
Vue.use(VueInputMask)
Vue.use(Notifications)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  mixins: [global],
  store,
  template: '<App/>'
}).$mount('#app')
