import axios from 'axios'

// 导入NProgress包对应js和css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'https://itheimashop.credere.top/api/'
    // timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(
    config => {
      // 在request拦截器中展示nprogress  NProgress.start()
      NProgress.start()
      config.headers.Authorization = window.sessionStorage.getItem('token')
      // console.log(config)
      return config
    },
    err => {
      console.log(err)
    }
  )

  // 2.2.响应拦截
  instance.interceptors.response.use(
    res => {
      // 在response拦截器中隐藏nprogress  NProgress.done()
      NProgress.done()
      return res.data
    },
    err => {
      console.log(err)
    }
  )

  // 3.发送真正的网络请求
  return instance(config)
}
