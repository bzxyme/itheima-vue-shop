import { request } from './request'

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

export function setUsersStatus(uid, type) {
  return request({
    method: 'put',
    url:`users/${uid}/state/${type}`
  })
}
