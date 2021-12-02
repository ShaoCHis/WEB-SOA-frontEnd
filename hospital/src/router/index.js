import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login'
import Main from '@/page/Main'
import Register from '@/page/Register'
import Notice from '@/components/MainComponents/releaseNotice'
import ReservationStatus from '@/components/MainComponents/reservationStatus'
import RoomInfo from '@/components/MainComponents/roomInfo'
import MoneyFlow from '@/components/MainComponents/showMoneyFlow'
import SuspendStatus from '@/components/MainComponents/suspendStatus'

Vue.use(Router)


export const ConstantRouterMap = [
  { path: '/login', name: "Login", component: Login, hidden: true },
  { path: '/register', name: "Register", component: Register, hidden: true },
  {
    path: '/', name: "Main", component: Main, hidden: true,redirect:'/Notice',
    children: [
      { path: 'Notice', name: 'Notice', component: Notice, hidden: true },
      { path: 'ReservationStatus', name: 'ReservationStatus', component: ReservationStatus, hidden: true },
      { path: 'RoomInfo', name: 'RoomInfo', component: RoomInfo, hidden: true },
      { path: 'MoneyFlow', name: 'MoneyFlow', component: MoneyFlow, hidden: true },
      { path: 'SuspendStatus', name: 'SuspendStatus', component: SuspendStatus, hidden: true },
    ]
  },
]


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: ConstantRouterMap
})
