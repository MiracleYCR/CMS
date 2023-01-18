import request from '@/utils/request'

export const getRoleList = () => {
  return request({
    url: '/role/list'
  })
}

export const getRolePermission = (roleId) => {
  return request({
    url: `/role/permission/${roleId}`
  })
}

export const distributeRolePermission = (data) => {
  return request({
    url: `/role/distribute-permission`,
    method: 'POST',
    data
  })
}
