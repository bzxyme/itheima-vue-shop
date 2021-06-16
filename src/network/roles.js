import { request } from './request'

//获取角色权限列表
export function getRolesList() {
  return request({
    url: '/roles'
  })
}
