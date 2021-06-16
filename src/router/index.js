import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载
const Login = () => import('@/views/login/Login')
const Home = () => import('@/views/home/Home')
const Welcome = () =>
  import('@/views/home/homeChildren/homeMainChildren/Welcome')
const Users = () =>
  import('@/views/home/homeChildren/homeMainChildren/user/User')
const Rights = () =>
  import('@/views/home/homeChildren/homeMainChildren/rights/Rights')
const Roles = () =>
  import('@/views/home/homeChildren/homeMainChildren/rights/Roles')

Vue.use(VueRouter)

const routes = [
  {
    //重定向
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    //子路由
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/roles',
        component: Roles
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  // from 从哪个路径跳转
  // next 是函数，表示放行
  if (to.path === '/login') return next()

  //判断token是否存在
  const tokenStr = window.sessionStorage.getItem('token')

  if (!tokenStr) return next('/login')

  next()
})

export default router
