import { LANG } from '@/constant'
import { getItem, setItem } from '@/utils/storage'

export default {
  namespaced: true,

  state: () => ({
    sideBarOpened: true,
    lang: getItem(LANG) || 'zh'
  }),

  mutations: {
    triggerSideBarOpened(state) {
      state.sideBarOpened = !state.sideBarOpened
    },
    setLang(state, curlang) {
      setItem(LANG, curlang)
      state.lang = curlang
    }
  }
}
