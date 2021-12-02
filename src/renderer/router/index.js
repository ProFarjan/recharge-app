import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  NProgress.set(0.1)

  const publicPages = ['/', '/forgot']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next({ path: '/' })
  }

  return next()
})

router.afterEach(() => {
  setTimeout(() => NProgress.done(), 500)
})

export default router
