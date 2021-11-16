import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'//axios
import './plugins/element.js'
import './assets/icon/iconfont.css'
Vue.config.productionTip = false
Vue.prototype.$axios = axios//axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import axios from 'axios'//axios
//import ElementUI from 'element-ui' //element-ui的全部组件
//import 'element-ui/lib/theme-chalk/index.css'//element-ui的css

//Vue.use(ElementUI) //使用elementUI


/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
