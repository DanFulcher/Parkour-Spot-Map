import Vue from 'vue'
import Vuex from 'vuex'
import spots from '../components/spots.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    spots: {}
  },
  actions: {
    GET_SPOTS ({commit}) {
      // console.log(spots)
      commit('SET_SPOTS', spots)
    }
  },
  mutations: {
    SET_SPOTS (state, spots) {
      state.spots = spots
    }
  }
})
