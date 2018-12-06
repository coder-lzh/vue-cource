const state = {
    appName2: 'admin2333',
}
const getters = {
    appNameWithVersion2: (state) => {
        return `${state.appName2}v2.000000`
    }
}
const mutations = {
  //
}
const actions = {
  //
}
export default {
    namespaced: true,
  state,
    getters,
  mutations,
  actions
}
