import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import datas from './models/datas'
import hospital from './models/hospital'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    datas,
    hospital
  },
  getters
})

export default store
