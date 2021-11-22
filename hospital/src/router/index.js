import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login'
import Main from '@/page/Main'
import Register from '@/page/Register'



Vue.use(Router)


export const ConstantRouterMap = [
  
  { path: '/', name: "Main", component: Main, hidden: true },
  { path: '/', name: "Login", component: Login, hidden: true },
  { path: '/', name: "Register", component: Register, hidden: true },
<<<<<<< Updated upstream
  { path: '/', name: "Main", component: Main, hidden: true },

=======
  
>>>>>>> Stashed changes

]


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: ConstantRouterMap
})
