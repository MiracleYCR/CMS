import request from '@/utils/request'

export const getTrendChart = () => {
  return request({
    url: `/chart/trend`
  })
}

export const getCalendarChart = () => {
  return request({
    url: `/chart/calendar`
  })
}

export const getFundChart = (date) => {
  return request({
    url: `/chart/time/amount`,
    params: {
      date
    }
  })
}

export const getPieChart = () => {
  return request({
    url: `/chart/pie`
  })
}

export const getWordChart = () => {
  return request({
    url: `/chart/wordcloud`
  })
}

export const getMapChart = () => {
  return request({
    url: '/chart/bmap'
  })
}
