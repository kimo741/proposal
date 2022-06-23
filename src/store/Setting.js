// import { Cookies, Notify } from "quasar";
import { api } from "../boot/axios";

const prefix = "setting";

const state = {
  sets: {},
};
const mutations = {
  GET_SETTING(state, payload) {
    state.sets = payload;
  },
  DELET_SETTING(state, payload) {
    let Index = state.sets.data.findIndex((d) => d.id === payload.id);
    state.sets.data.splice(Index, 1);
  },
  ADD_SETTING(state, payload) {
    state.sets.data.unshift(payload);
  },
  UPDATE_SETTING(state, payload) {
    let edit = state.sets.data.filter((d) => d.id === payload.id);
    state.sets.data.splice(edit[0], 1, payload);
  },
};

const actions = {
  async getSettings({ commit }, payload) {
    const { data } = await api.get(`${prefix}/show-table?${payload}`);
    commit("GET_SETTING", await data);
    return data;
  },
  async deletSetting({ commit }, payload) {
    const { data } = await api.delete(`${prefix}/${payload}`);
    commit("DELET_SETTING", await data);
    return data;
  },
  async updaSetting({ commit }, payload) {
    const { data } = await api.post(`${prefix}`, payload);
    await console.log(data);
    if (payload.id) commit("UPDATE_SETTING", await data);
    else commit("ADD_SETTING", await data);
    return  data ;
  },
};

const getters = {
  sets: (state) => {
    return state.sets;
  },
};

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
};
