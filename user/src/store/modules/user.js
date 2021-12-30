import { getToken, setToken, removeToken } from '@/utils/auth'
import { login_ID, login_Code } from '@/api/login'

const user = {
  state: {
    token: getToken(),
    id: sessionStorage.getItem('userId'),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {  //Vuex store状态的更新唯一方式
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ID: (state, id) => {
      state.id = id
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const DATA = { 'token': 'admin' }
      const id = userInfo.user_id
      //console.log(userInfo.isCode)
      return new Promise((resolve, reject) => {
        login(id, userInfo.password)
          .then(response => {
            const data = response
            setToken(DATA.token)
            commit('SET_TOKEN', DATA.token)
            commit('SET_ID', response.id)
            sessionStorage.setItem('userId', response.id)
            resolve()
          }).catch(error => {
            reject(error)
            //console.log(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {

      const data = { 'roles': 'admin', 'name': 'admin', 'avatar': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif' }
      if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        commit('SET_ROLES', data.roles)
      } else {
        reject('getInfo: roles must be a non-null array !')
      }
      commit('SET_NAME', data.name)
      commit('SET_AVATAR', data.avatar)

      // return new Promise((resolve, reject) => {
      //   getInfo(state.token).then(response => {
      //     const data = response.data
      //     if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
      //       commit('SET_ROLES', data.roles)
      //     } else {
      //       reject('getInfo: roles must be a non-null array !')
      //     }
      //     commit('SET_NAME', data.name)
      //     commit('SET_AVATAR', data.avatar)
      //     resolve(response)
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },

    // 登出
    LogOut({ commit, state }) {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_NAME', '')
      removeToken()
      // return new Promise((resolve, reject) => {
      //   logout(state.token).then(() => {
      //     commit('SET_TOKEN', '')
      //     commit('SET_ROLES', [])
      //     removeToken()
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      //return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
      //})
    },
  }
}

export default user
