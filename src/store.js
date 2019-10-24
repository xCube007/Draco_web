import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginStatus: false
  },
  mutations: {
    chgLoginStatus (state, data) {
      state.loginStatus = data
    }
  },
  actions: {

  }
})
