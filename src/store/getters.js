import { MAIN_COLOR } from '@/constant'
import { getItem } from '@/utils/storage'
import { generateColors } from '@/utils/theme'

const getters = {
  // 鉴权
  token: (state) => state.user.token,
  // 是否存在用户信息
  hasUserInfo: (state) => JSON.stringify(state.user.userInfo) !== '{}',
  // 用户信息
  userInfo: (state) => state.user.userInfo,
  // 样式访问
  cssVar: (state) => ({
    ...state.app.styleVariables,
    ...generateColors(getItem(MAIN_COLOR))
  }),
  // 侧边栏展开
  sideBarOpened: (state) => state.app.sideBarOpened,
  // 语言
  lang: (state) => state.app.lang,
  // 主题色
  mainColor: (state) => state.app.mainColor
}

export default getters
