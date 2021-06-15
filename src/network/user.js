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
export function setUserInfo(id) {
  let uid = Number(id)
  return request({
    method: 'put',
    url: `users/${uid}`
  })
}
