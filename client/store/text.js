export const state = () => ({
  texts: {}
})

export const mutations = {
  setTexts (state, texts = {}) {
    state.texts = texts
  }
}

export const getters = {
  getTexts (state) {
    return state.texts
  }
}

export const actions = {
  setTexts ({ commit }, texts) {
    commit('setTexts', texts)
  }
}
