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

//获取腹肌分类列表
export function getParentCateList(type) {
  return request({
    url: '/categories',
    params: {
      type
    }
  })
}

//添加分类
export function addCateSort(cat_pid, cat_name, cat_level) {
  return request({
    method: 'post',
    url: '/categories',
    data: {
      cat_pid,
      cat_name,
      cat_level
    }
  })
}

//删除分类
export function removeCateSort(id) {
  return request({
    method: 'delete',
    url: `/categories/${id}`,
  })
}
