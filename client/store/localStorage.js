import VueJwtDecode from 'vue-jwt-decode'

export const state = () => ({
  token: null,
  onBoarding: null
})

export const mutations = {
  setToken (state, value) {
    state.token = value
  },
  setOnBoarding (state, value) {
    state.onBoarding = value
  }
}

export const getters = {
  getToken (state) {
    return state.token
  },
  getUser (state) {
    return VueJwtDecode.decode(state.token)
  },
  getOnBoarding (state) {
    return state.onBoarding
  }
}

export const actions = {
  setToken ({ commit }, value) {
    commit('setToken', value)
  },
  setOnBoarding ({ commit }, value) {
    commit('setOnBoarding', value)
  }
}
