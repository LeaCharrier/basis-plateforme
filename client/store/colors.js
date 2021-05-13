export const state = () => ({
  selected: 0
})

export const mutations = {
  setSelected (state, value = 0) {
    state.selected = value
  }
}

export const getters = {
  getSelected (state) {
    return state.selected
  }
}

export const actions = {
  setSelected ({ commit }, value) {
    commit('setSelected', value)
  }
}
