export const state = () => ({
  selected: []
})

export const mutations = {
  setSelected (state, value = []) {
    state.selected = value
  },
  pushSelected (state, value = {}) {
    const isSelected = state.selected.filter(i => i.id === value.id)

    if (isSelected.length) {
      state.selected = state.selected.filter(i => i.id !== value.id)
    } else {
      state.selected.push(value)
    }
  }
}

export const getters = {
  getSelected (state) {
    return state.selected
  },
  getSelectedLength (state) {
    return state.selected.length
  }
}

export const actions = {
  setSelected ({ commit }, value) {
    commit('setSelected', value)
  },
  pushSelected ({ commit }, value) {
    commit('pushSelected', value)
  }
}
