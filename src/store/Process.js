import { Cookies, Notify } from "quasar";
import { api } from "../boot/axios";

const prefix = "process";

const state = {
  Process: [],
  reatedItem:{}

};

const mutations = {
  ASSIGN_EMP_TO_STAGE(state, payload) {
    state.Process = payload;
  },
  ASSIGN_STAGE_TO_ITEM(state, payload) {
    state.Process = payload;
  },
  GET_RELATED_ITEMS(state, payload) {
    state.reatedItem = payload;
  },
};

const actions = {

  async getRelatedItems({ commit }, payload) {
    const { data } = await api.post(`${prefix}/items`, payload);
    commit("GET_RELATED_ITEMS", await data);
    return data;
  },
  async assignEmpToStage({ commit }, payload) {
    const { data } = await api.post(`${prefix}/assignEmployee`, payload);
    commit("ASSIGN_EMP_TO_STAGE", await data);
    return data;
  },
  async assignStageToItem({ commit }, payload) {
    const { data } = await api.post(`${prefix}/assignStage`, payload);
    commit("ASSIGN_STAGE_TO_ITEM", await data);
    return data;
  },
};

const getters = {
  Process: (state) => {
    return state.Process;
  },
  reatedItem: (state) => {
    return state.reatedItem;
  },
};

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
};
