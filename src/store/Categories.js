import { Cookies, Notify } from "quasar";
import { api } from "../boot/axios";

const prefix = "category";

const state = {
  cats: {},
  // cat: {},
};

const mutations = {
  GET_CATS(state, payload) {
    state.cats = payload;
  },

  // GET_CAT(state, payload) {
  //   state.cat = payload;
  // },

  ADD_CAT(state, payload) {
    state.cats.data.unshift(payload);
  },

  EDIT_CAT(state, payload) {
    state.cats.data = payload;
  },

  UPDATE_CAT(state, payload) {
    let Obj = state.cats.data.filter((d) => d.id === payload.id);
    state.cats.data.splice(Obj[0], 1, payload);
  },

  DELETE_CAT(state, payload) {
    let Index = state.cats.findIndex((d) => d.id === payload.id);
    state.cats.data.splice(Index, 1);
  },
};

const actions = {
  async getCats({ commit }, payload) {
    const { data } = await api.get(`${prefix}/show-table?${payload}`);
    commit("GET_CATS", await data);
    return data;
  },

  async getCat({ commit }, payload) {
    const { data } = await api.get(`${prefix}/${payload}`);
    commit("GET_CAT", await data);
    return data;
  },

  async addOrUpdateCat({ commit }, payload) {
    const res = await api.post(`${prefix}`, payload);
    if (payload.has("id")) commit("UPDATE_CAT", await res);
    else commit("ADD_CAT", await res);
    return res;
  },

  async deleteCat({ commit }, payload) {
    const { data } = await api.delete(`${prefix}/${payload}`);
    commit("DELETE_CAT", await data);
    return data;
  },
};

const getters = {
  cats: (state) => {
    return state.cats;
  },

  cat: (state) => {
    return state.cat;
  },

  profile: (state) => {
    return state.profile;
  },
};

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
};
