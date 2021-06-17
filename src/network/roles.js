import { request } from './request'

//获取角色权限列表
export function getRolesList() {
  return request({
    url: '/roles'
  })
}

//删除用户权限
export function removeUserRoles(roleId, rolesId) {
  return request({
    method: 'delete',
    url: `roles/${roleId}/rights/${rolesId}`
  })
}

//获取所有权限信息
export function getRightAll() {
  return request({
    url: `rights/tree`
  })
}

//角色授权
export function setUserRights(roleId, rids) {
  return request({
    method: 'post',
    url: `roles/${roleId}/rights`,
    data: {
      rids
    }
  })
}
