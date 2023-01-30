import store from '@/store'
import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/views/layout/index.vue'

import userManage from './modules/user/userManage'
import roleList from './modules/user/roleList'
import permissionList from './modules/user/permissionList'

import article from './modules/article/article'
import articleCreate from './modules/article/create'

// 无需权限路由
export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () =>
          import(/* webpackChunkName: "profile" */ '@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'personnel-info'
        }
      },
      {
        path: '/chart',
        name: 'chart',
        component: () =>
          import(/* webpackChunkName: "chart" */ '@/views/chart/index.vue'),
        meta: {
          title: 'chart',
          icon: 'chart'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () =>
          import(
            /* webpackChunkName: "error-page-404" */ '@/views/errorPage/404.vue'
          )
      },
      {
        path: '/401',
        name: '401',
        component: () =>
          import(
            /* webpackChunkName: "error-page-401" */ '@/views/errorPage/401.vue'
          )
      }
    ]
  }
]

// 需要权限的路由表
export const privateRoutes = [
  userManage,
  roleList,
  permissionList,
  article,
  articleCreate
]

export const resetRoute = () => {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((item) => {
      router.removeRoute(item)
    })
  }
}

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: publicRoutes
})

export default router
