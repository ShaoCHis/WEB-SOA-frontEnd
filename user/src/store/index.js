import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import datas from './models/datas'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    datas
  },
  getters
})

export default store
