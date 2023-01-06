import request from '@/utils/request'

export const login = (postdata) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data: postdata
  })
}
