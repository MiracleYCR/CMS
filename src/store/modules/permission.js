import { publicRoutes, privateRoutes } from '@/router'

export default {
  namespaced: true,

  state: () => ({
    routes: publicRoutes
  }),

  mutations: {
    // 增加路由
    setRoutes(state, newRoutes) {
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },

  actions: {
    // 根据权限筛选路由
    filterRoutes(context, menus) {
      const routes = []
      // 根据权限筛选路由表
      menus.forEach((key) => {
        routes.push(...privateRoutes.filter((item) => item.name === key))
      })

      // 所有不匹配的路由，全部进入 404 的路由配置
      // 注意: 该配置必须要在所有路由指定之后
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })

      context.commit('setRoutes', routes)

      return routes
    }
  }
}
