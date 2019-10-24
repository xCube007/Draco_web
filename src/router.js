import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
const index = resolve => require(['@/views/index/'], resolve)
const Login = resolve => require(['@/views/Login/'], resolve)
const Homepage = resolve => require(['@/views/Homepage/'], resolve)
const User = resolve => require(['@/views/User/'], resolve)

Vue.use(Router)

const vueRouter = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/Homepage',
      name: 'Homepage',
      component: Homepage,
      children: [
        {
          path: '/Homepage/user',
          name: 'user',
          component: User
        }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

vueRouter.beforeEach((to, from, next) => {
  console.log(to)
  // 目标路径为首页和登录不需要校验
  if (to.path === '/' || to.path === '/login') return next()
  // 无token直接跳转登录
  if (localStorage.getItem('token') === null) return next('/login')
  // 页面刷新时进入主页而不是子页面
  if ((to.path !== '/' && to.path !== '/login' && to.path !== '/Homepage') && store.state.loginStatus === false) return next('/Homepage')
  return next()
})

export default vueRouter
