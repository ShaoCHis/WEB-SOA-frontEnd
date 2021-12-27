import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login'
import Main from '@/page/Main'
import HosList from '@/components/MainComponents/hospitalList'
import applyList from '@/components/MainComponents/applyList'
import MoneyFlow from '@/components/MainComponents/showMoneyFlow'

Vue.use(Router)


export const ConstantRouterMap = [
  { path: '/login', name: "Login", component: Login, hidden: true },
  {
    path: '/', name: "Main", component: Main, hidden: true, redirect: '/Notice',
    children: [
      { path: 'HosList', name: 'HosList', component: HosList, hidden: true },
      { path: 'applyList', name: 'applyList', component: applyList, hidden: true },
      { path: 'MoneyFlow', name: 'MoneyFlow', component: MoneyFlow, hidden: true },
    ]
  },
]


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: ConstantRouterMap
})
