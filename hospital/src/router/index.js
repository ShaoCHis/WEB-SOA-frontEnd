import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'


Vue.use(Router)


export const ConstantRouterMap = [
  { path: '/', name:"Login",component: Login, hidden: true },


]


export default new Router({
  // mode: 'history', //后端支持可开
  //scrollBehavior: () => ({ y: 0 }),
  routes: ConstantRouterMap
})
