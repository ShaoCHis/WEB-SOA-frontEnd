import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'



Vue.use(Router)


export const ConstantRouterMap = [
  { path: '/', name:"Login",component: Login, hidden: true },
  { path: '/', name:"Register",component: Register, hidden: true }, 

]


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 1 }),
  routes: ConstantRouterMap
})
