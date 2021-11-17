import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ManagePage from '@/components/Admin/ManagePage'
import HMainPage from '@/components/Hospital/HMainPage'
import MainPage from '@/components/Patient/MainPage'


Vue.use(Router)


export const ConstantRouterMap = [
  { path: '/', name:"Login",component: Login, hidden: true },
  { path: '/', name:"Register",component: Register, hidden: true },
  { path: '/Admin/ManagePage', name: 'ManagePage',component: ManagePage},
  { path: '/Hospital/HMainPage', name: 'HMainPage',component: HMainPage},
  { path: '/Patient/MainPage', name: 'MainPage',component: MainPage},


]


export default new Router({
  // mode: 'history', //后端支持可开
  //scrollBehavior: () => ({ y: 0 }),
  routes: ConstantRouterMap
})
