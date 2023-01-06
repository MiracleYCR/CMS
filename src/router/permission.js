import router from './index'
import store from '@/store'

// 白名单页面
const whiteList = ['/login']

// 路由前置守卫
router.beforeEach((to, from, next) => {
  // 1. 用户已经登录
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 2. 用户未登录
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
