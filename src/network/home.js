import {request} from './request'


export function getHomeAside(){
    return request({
        url:'/menus'
    })
}