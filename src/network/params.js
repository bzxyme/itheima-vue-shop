import { request } from './request'

//请求商品分类列表
export function getCateList() {
  return request({
    url: '/categories'
  })
}

//请求参数列表
export function getParamsList(id, sel) {
  //   console.log(id)
  return request({
    url: `/categories/${id}/attributes`,
    params: {
      sel
    }
  })
}
//添加动态参数或静态属性
export function addParamsList(id, attr_name, attr_sel, attr_vals) {
  return request({
    method: 'post',
    url: `/categories/${id}/attributes`,
    data: {
      attr_name,
      attr_sel,
      attr_vals
    }
  })
}

//展示参数内容
export function getParamsCon(id, attrId, attr_sel, attr_vals) {
  return request({
    url: `/categories/${id}/attributes/${attrId}`,
    params: {
      attr_sel,
      attr_vals
    }
  })
}

//修改/提交参数内容
export function setParamsCon(id, attrId, attr_name, attr_sel, attr_vals) {
  return request({
    method: 'put',
    url: `/categories/${id}/attributes/${attrId}`,
    data: {
      attr_name,
      attr_sel,
      attr_vals
    }
  })
}
//删除参数
export function removeParams(id, attrid) {
  console.log(id)
  console.log(typeof id)
  return request({
    method: 'delete',
    url: `categories/${id}/attributes/${attrid}`
  })
}
