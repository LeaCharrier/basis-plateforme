export const state = () => ({
  popin: {
    isOpen: false,
    isNew: false,
    userId: null,
    statusId: null,
    content: ''
  }
})

export const mutations = {
  setPopin (state, { isOpen = false, isNew = false, userId = null, statusId = null, content = '' }) {
    state.popin.isOpen = isOpen
    state.popin.isNew = isNew

    if (isNew) {
      state.popin.userId = null
      state.popin.statusId = null
      state.popin.content = ''
    } else {
      state.popin.userId = userId
      state.popin.statusId = statusId
      state.popin.content = content
    }
  }
}

export const getters = {
  getPopin (state) {
    return state.popin
  },
  getPopinStatus (state) {
    return state.popin.isNew
  }
}

export const actions = {
  setPopin ({ commit }, popin) {
    commit('setPopin', popin)
  }
}
