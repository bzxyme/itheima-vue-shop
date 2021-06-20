import { request } from './request'

//查询订单列表
export function getOrderList(queryInfo) {
  return request({
    url: '/orders',
    params: {
      query: queryInfo.query,
      pagenum: queryInfo.pagenum,
      pagesize: queryInfo.pagesize
    }
  })
}

//查看物流进度
export function getProgress(id) {
  return request({
    url: `/kuaidi/${id}`
  })
}
