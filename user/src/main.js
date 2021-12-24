// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/permission'


//导入包
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import less from 'less'


Vue.use(ElementUI)
Vue.prototype.$axios=axios
Vue.prototype.$cookie = Cookies;
Vue.use(less)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
