import { request } from './request'

//获取角色权限列表
export function getRolesList() {
  return request({
    url: '/roles'
  })
}

//删除用户权限
export function removeUserRoles(roleId,rolesId){
  return request({
    method:'delete',
    url:`roles/${roleId}/rights/${rolesId}`
  })
}
