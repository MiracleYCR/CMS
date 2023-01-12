import i18n from '@/i18n'
import store from '@/store'
import { watch } from 'vue'

// 生成国际化路由的 title
export function generateTitle(title) {
  return i18n.global.t(`msg.route.${title}`)
}

// 切换语言的回调函数执行
export function watchSwitchLang(...callbacks) {
  watch(
    () => store.getters.lang,
    () => {
      callbacks.forEach((cb) => cb())
    }
  )
}
