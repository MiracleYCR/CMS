import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import rt from 'dayjs/plugin/relativeTime'

import print from 'vue3-print-nb'

import store from '@/store'

export const dateFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

dayjs.extend(rt)
const relativeTime = (val) => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs()
    .locale(store.getters.lang === 'zh' ? 'zh-cn' : 'en')
    .to(dayjs(val))
}

// 注册打印
export const registerPrint = (app) => {
  app.use(print)
}

export const registerFilter = (app) => {
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime
  }
}
