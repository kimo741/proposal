import { Cookies, Notify } from "quasar";
import { api } from "../boot/axios";

const prefix = "client";

const state = {
  clints:{},
};

const mutations = {
  GET_CLINTS(state, payload) {
    state.clints = payload;
  },
  ADD_CLINT(state, payload) {
    state.clints.data.unshift(payload);
  },
  UPDATE_CLINT(state, payload) {
    let edit = state.clints.data.filter((d) => d.id === payload.id);
    state.clints.data.splice(edit[0], 1, payload);
  },
  DELET_CLINT(state, payload) {
    let Index = state.clints.findIndex((d) => d.id === payload.id);
    state.clints.data.splice(Index, 1);
  },
};

const actions = {
  async getCLints({ commit }, payload) {
    const { data } = await api.get(`${prefix}/show-table?${payload}`);
    commit("GET_CLINTS", await data);
    return data;
  },
  async updateClients({ commit }, payload) {
    const { data } = await api.post(`${prefix}`, payload);
    if (payload.id) commit("UPDATE_CLINT", await data);
    else commit("ADD_CLINT", await data);
    return data;
  },
  async deletClients({ commit }, payload) {
    const { data } = await api.delete(`${prefix}/${payload}`);
    commit("DELET_CLINT", await data);
    return data;
  },
};

const getters = {
  clints: (state) => {
    return state.clints;
  },
};

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
};
