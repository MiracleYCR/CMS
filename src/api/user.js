import request from '@/utils/request'

export const login = (postdata) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data: postdata
  })
}

export const getUserInfo = () => {
  return request({
    url: '/sys/profile',
    method: 'GET'
  })
}

export const getFeature = () => {
  return request({
    url: '/user/feature',
    method: 'GET'
  })
}
