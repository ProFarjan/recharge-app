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
      path: '*',
      redirect: '/'
    }
  ]
})
