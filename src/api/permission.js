import request from '@/utils/request'

export const getPermissionList = () => {
  return request({
    url: '/permission/list'
  })
}
