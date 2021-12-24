const hospital = {
    state: {
        id: "",
        avatar: "",
        introduction: "",
        level: "",
        notice: "",
        status: "",
        name: "",
        code: "",
        location: ""
        // this.$store.state.datas.departData
    },
    mutations: {
        SET_HOSPITAL: (state, hospital) => {
            state.id = hospital.id
            state.avatar=hospital.image
            state.introduction=hospital.introduction
            state.level=hospital.level
            state.notice=hospital.notice
            state.status=hospital.status
            state.name=hospital.name
            state.code=hospital.code
            state.location=hospital.location
        },
        SET_HOSID:(state,ID)=>{
            state.id=ID
        }
    },
    actions: {
        setHospital({ commit }, hospital) {
            commit('SET_DEPARTDATA', hospital);
        },
        setHosID({commit},ID){
            commit('SET_HOSID',ID)
        }
    }
}

export default hospital