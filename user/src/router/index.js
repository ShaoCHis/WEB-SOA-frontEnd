import Vue from 'vue'

import Router from 'vue-router'
import Login from '@/page/Login'

import Main from '@/page/Main'
import Register from '@/page/Register'

import error from '@/page/404/error'

import Hospital from '@/page/Hospital'

import Reservation from '@/page/Reservation'

import UserInfo from '@/page/UserInfo'

Vue.use(Router)


export const ConstantRouterMap = [
  { path: '/login', name: "Login", component: Login, hidden: true },
  { path: '/register', name: "Register", component: Register, hidden: true },
  {
    path: '/', name: "Main", component: Main, hidden: true,
  },
  { path: '/error', name: "error", component: error, hidden: true },
  { path: '/hospital', name: "Hospital", component: Hospital, hidden: true },
  { path: '/reservation', name: "Reservation", component: Reservation, hidden: true },
  { path: '/userinfo', name: "UserInfo", component:UserInfo, hidden: true },
]


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: ConstantRouterMap
})
