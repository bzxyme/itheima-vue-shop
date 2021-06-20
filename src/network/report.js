import {request} from './request'

//请求数据统计折线图
export function getReport(){
    return request({
        url:'/reports/type/1'
    })
}