import { Cookies, Notify } from "quasar";
import { api } from "../boot/axios";

const prefix = "dashboard/user";

const state = {
  users: [],
  user: {},
  profile: [],
  checkPss: "",
};

const mutations = {
  GET_USERS(state, payload) {
    state.check = payload;
  },
  CHECK_PASSWORD(state, payload) {
    state.users = payload;
  },

  GET_USER(state, payload) {
    state.user = payload;
  },

  ADD_USER(state, payload) {
    state.users.data.unshift(payload);
  },

  EDIT_USER(state, payload) {
    state.user = payload;
  },

  GET_PROFILE(state, payload) {
    state.profile = payload;
  },

  UPDATE_USER(state, payload) {
    let Obj = state.users.data.filter((d) => d.id === payload.id);
    Object.assign(Obj[0], payload);
  },

  DELETE_USER(state, payload) {
    let Index = state.users.data.findIndex((d) => d.id === payload.id);
    state.users.data.splice(Index, 1);
  },
};

const actions = {
  async getUsers({ commit }, payload) {
    const { data } = await api.get(`${prefix}/show-table?${payload}`);
    commit("GET_USERS", await data);
    return data;
  },
  async CheckPassword({ commit }, payload) {
    const { data } = await api.post(`${prefix}/checkPassword`, payload);
    commit("CHECK_PASSWORD", await data);
    return data;
  },

  async getUser({ commit }, payload) {
    const { data } = await api.get(`${prefix}/${payload}`);
    commit("GET_USER", await data);
    return data;
  },

  async addOrUpdateUser({ commit }, payload) {
    const { data } = await api.post(`${prefix}`, payload);
    if (payload.has("id")) commit("UPDATE_USER", await data);
    else commit("ADD_USER", await data);
    return data;
  },

  async deleteUser({ commit }, payload) {
    const { data } = await api.delete(`${prefix}/${payload}`);
    commit("DELETE_USER", await data);
    return data;
  },
};

const getters = {
  users: (state) => {
    return state.users;
  },

  user: (state) => {
    return state.user;
  },

  profile: (state) => {
    return state.profile;
  },
  checkPass: (state) => {
    return state.checkPss;
  },
};

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
};
