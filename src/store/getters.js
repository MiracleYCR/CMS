import styleVariables from '@/styles/variable.module.scss'

const getters = {
  // 鉴权
  token: (state) => state.user.token,
  // 是否存在用户信息
  hasUserInfo: (state) => JSON.stringify(state.user.userInfo) !== '{}',
  // 用户信息
  userInfo: (state) => state.user.userInfo,
  // 样式访问
  cssVar: () => styleVariables,
  // 侧边栏展开
  sideBarOpened: (state) => state.app.sideBarOpened,
  // 语言
  lang: (state) => state.app.lang
}

export default getters
