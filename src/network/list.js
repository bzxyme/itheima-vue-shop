import { request } from './request'

//获取商品列表
export function getGoodsList(query, pagenum, pagesize) {
  return request({
    url: '/goods',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

//删除商品
export function removeGoods(id) {
  return request({
    method: 'delete',
    url: `goods/${id}`
  })
}
