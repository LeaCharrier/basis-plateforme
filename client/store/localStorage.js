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
  getHeaders (state) {
    return {
      headers: {
        Authorization: `Bearer ${state.token}`
      }
    }
  },
  getUser (state) {
    return (state.token) ? { ...(VueJwtDecode.decode(state.token)), token: state.token } : null
  },
  getOnBoarding (state) {
    return state.onBoarding
  }
}

export const actions = {
  setToken ({ commit }, value) {
    commit('setToken', value)
  },
  logout ({ commit }) {
    commit('setToken', null)
  },
  setOnBoarding ({ commit }, value) {
    commit('setOnBoarding', value)
  }
}
