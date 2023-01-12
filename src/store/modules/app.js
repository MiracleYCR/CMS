import { getItem, setItem } from '@/utils/storage'
import styleVariables from '@/styles/variable.module.scss'
import { LANG, MAIN_COLOR, DEFAULT_COLOR } from '@/constant'

export default {
  namespaced: true,

  state: () => ({
    sideBarOpened: true,
    lang: getItem(LANG) || 'zh',
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    styleVariables: styleVariables
  }),

  mutations: {
    triggerSideBarOpened(state) {
      state.sideBarOpened = !state.sideBarOpened
    },

    setLang(state, curlang) {
      setItem(LANG, curlang)
      state.lang = curlang
    },

    setMainColor(state, newColor) {
      state.mainColor = newColor
      state.styleVariables.menuBg = newColor
      setItem(MAIN_COLOR, newColor)
    }
  }
}
