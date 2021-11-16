import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/Login'
// import Result from '@/components/Result'
import Login from '../components/Login.vue'
import test from '../components/test.vue'
import test2 from '../components/test2.vue'
import Register from '../components/Register.vue'
import ManagePage from '../components/Admin/ManagePage.vue'
import HMainPage from '../components/Hospital/HMainPage.vue'
import MainPage from '../components/Patient/MainPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: test},
    { path: '/login', component: Login},
    { path: '/register', component: Register},
    { path: '/managepage', component: ManagePage},
    { path: '/hmainpage', component: HMainPage},
    { path: '/mainpage', component: MainPage},
    { path: '/test', component: test},
    { path: '/test', component: test},
  ]
})
