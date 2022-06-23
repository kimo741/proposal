// import { Cookies, Notify } from "quasar";
import { api } from "../boot/axios";

const prefix = "item";

const state = {
  items: {},
  listItem: [],
};

const mutations = {
  GET_ITEMS(state, payload) {
    state.items = payload;
  },
  GET_ITEM_LIST(state, payload) {
    state.listItem = payload;
  },
  DELET_ITEM(state, payload) {
    let Index = state.emps.data.findIndex((d) => d.id === payload.id);
    state.items.data.splice(Index, 1);
  },
  ADD_ITEM(state, payload) {
    state.items.data.unshift(payload);
  },
  UPDATE_ITEM(state, payload) {
    let edit = state.items.data.filter((d) => d.id === payload.id);
    state.items.data.splice(edit[0], 1, payload);
  },
};

const actions = {
  async getItems({ commit }, payload) {
    const { data } = await api.get(`${prefix}/show-table?${payload}`);
    commit("GET_ITEMS", await data);
    return data;
  },
    async getItemsList({ commit }, payload) {
      const { data } = await api.get(`${prefix}?${payload}`);
      commit("GET_ITEM_LIST", await data);
      return data;
    },
  async deletItem({ commit }, payload) {
    const { data } = await api.delete(`${prefix}/${payload}`);
    commit("DELET_ITEM", await data);
    return data;
  },
  async updateItem({ commit }, payload) {
    const { data } = await api.post(`${prefix}`, payload);
    if (payload.id) commit("UPDATE_ITEM", await data);
    else commit("ADD_ITEM", await data);
    return data;
  },
};

const getters = {
  items: (state) => {
    return state.items;
  },
  listItem: (state) => {
    return state.listItem;
  },
};

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
};
