import { request } from './request'

//获取用户权限列表
export function getRightsList() {
  return request({
    url: `rights/list`
  })
}
