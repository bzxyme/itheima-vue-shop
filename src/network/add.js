import { request } from './request'

// 添加商品
export function addGoods(form) {
  console.log(form)
  return request({
    method: 'post',
    url: '/goods',
    data: {
      goods_name: form.goods_name,
      goods_cat: form.goods_cat,
      goods_price: form.goods_price,
      goods_number: form.goods_number,
      goods_weight: form.goods_weight,
      goods_introduce: form.goods_introduce,
      pics: form.pics,
      attrs: form.attrs
    }
  })
}
