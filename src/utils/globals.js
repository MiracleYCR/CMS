import dayjs from 'dayjs'
import print from 'vue3-print-nb'

export const dateFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

export const registerPrint = (app) => {
  app.use(print)
}

export const registerFilter = (app) => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
