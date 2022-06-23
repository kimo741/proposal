const state = {
  formDrawerOpen: false,

  // formDrawerMob: true,
};

const mutations = {
  OPENE_FORM_DROWER(state, payload) {
    state.formDrawerOpen = !state.formDrawerOpen;
  },
  // OPENE_FORM_MOB(state, payload) {
  //   state.formDrawerMob = !state.formDrawerMob;
  // },
};

const actions = {};

const getters = {};

export default {
  getters,
  mutations,
  actions,
  state,
};
