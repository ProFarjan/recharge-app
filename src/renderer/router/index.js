import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login-page',
      component: require('@/components/LoginPage').default
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: require('@/components/Dashboard').default
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: require('@/components/Recharge').default
    },
    {
      path: '/banking',
      name: 'banking',
      component: require('@/components/Banking').default
    }
  ]
})
