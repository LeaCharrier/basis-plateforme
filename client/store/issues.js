export const state = () => ({
  popin: false,
  id: null
})

export const mutations = {
  setPopin (state, { open = false, id = null }) {
    state.popin = open
    state.id = id
  }
}

export const getters = {
  getPopin (state) {
    return state.popin
  },
  getPopinId (state) {
    return state.id
  },
  getPopinStatus (state) {
    return !state.id
  }
}

export const actions = {
  setPopin ({ commit }, popin) {
    commit('setPopin', popin)
  }
}
