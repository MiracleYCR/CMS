import store from '@/store'
import { createI18n } from 'vue-i18n'
import zhLocale from './lang/zh'
import enLocale from './lang/en'

const messages = {
  en: {
    msg: {
      ...enLocale
    }
  },

  zh: {
    msg: {
      ...zhLocale
    }
  }
}

const i18n = createI18n({
  // 使用 compistion API
  legacy: false,
  // 全局导入
  globalInjection: true,
  locale: store.getters.lang,
  messages
})

export default i18n
