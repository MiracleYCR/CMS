export default {
  namespaced: true,

  state: () => ({
    sideBarOpened: true
  }),

  mutations: {
    triggerSideBarOpened(state) {
      state.sideBarOpened = !state.sideBarOpened
    }
  }
}
