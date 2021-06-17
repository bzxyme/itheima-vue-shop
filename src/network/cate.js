import { request } from './request'

//获取商品分类列表
export function getCateList(type, pagenum, pagesize) {
  return request({
    url: '/categories',
    params: {
      type,
      pagenum,
      pagesize
    }
  })
}
