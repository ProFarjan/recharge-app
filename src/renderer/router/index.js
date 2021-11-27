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
      component: () => import(/* webpackChunkName: "dashboard" */ '@/components/Dashboard')
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: () => import(/* webpackChunkName: "recharge" */ '@/components/Recharge')
    },
    {
      path: '/banking',
      name: 'banking',
      component: () => import(/* webpackChunkName: "banking" */ '@/components/Banking')
    },
    {
      path: '/received',
      name: 'received',
      component: () => import(/* webpackChunkName: "received" */ '@/components/Received')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import(/* webpackChunkName: "received" */ '@/components/Setting')
    }
  ]
})
