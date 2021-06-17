import { request } from './request'

//请求用户数据
export function getUsersList(query, pagenum, pagesize) {
  return request({
    url: '/users',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

//更改用户状态
export function setUsersStatus(uid, type) {
  return request({
    method: 'put',
    url: `users/${uid}/state/${type}`
  })
}

//添加用户
export function addUser(username, password, email, mobile) {
  return request({
    method: 'post',
    url: '/users',
    //携带参数必须写
    data: {
      username,
      password,
      email,
      mobile
    }
  })
}

//id查询信息
export function getIdInfo(id) {
  return request({
    url: `users/${id}`
  })
}

//修改用户数据
export function setUserInfo(id, email, mobile) {
  let uid = Number(id)
  return request({
    method: 'put',
    url: `users/${id}`,
    data: {
      email,
      mobile
    }
  })
}

//删除用户信息
export function removeUserInfo(id){
  return request({
    method:'delete',
    url:`users/${id}`
  })
}


//角色列表
export function getRoleList(){
  return request({
    url:'/roles'
  })
}

//分配新角色
export function setNewRole(id,rid){
  return request({
    method:'put',
    url:`users/${id}/role`,
    data:{
      rid
    }
  })

}