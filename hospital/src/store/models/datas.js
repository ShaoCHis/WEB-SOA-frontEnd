const datas = {
  state: {
    departData: []
    // this.$store.state.datas.departData
  },
  mutations: {
    SET_DEPARTDATA: (state, departData) => {
      state.departData = departData
    },
  },
  actions: {
    setDepart({ commit }, commitment) {
      commit('SET_DEPARTDATA', commitment);
    }
  }
}

export default datas