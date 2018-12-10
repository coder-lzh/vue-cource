//import { getAppName } from '@/api/app'

const actions = {
    // updateAppName ({ commit }) {
    //   getAppName().then(res => {
    //     const { info: { appName } } = res
    //     commit('SET_APP_NAME', appName)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // }
    async updateAppName ({ commit }) {
        commit('SET_STATE_VALUE', 11111111111111)
    }
}
export default actions
