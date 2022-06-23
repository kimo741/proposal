import { Cookies, Notify } from "quasar";
import { api } from "../boot/axios";

const prefix = "employee";

const state = {
  emps: {},
  empList:[]
};

const mutations = {
  GET_EMP(state, payload) {
    state.emps = payload;
  },
  GET_LISTE_MPLOYEE(state, payload) {
    state.empList = payload;
  },
  DELET_EMPLOYEE(state, payload) {
    let Index = state.emps.findIndex((d) => d.id === payload.id);
    state.emps.data.splice(Index, 1);
  },
  ADD_EMPLOYEE(state, payload) {
    state.emps.data.unshift(payload);
  },
  UPDATE_EMPLOYEE(state, payload) {
    let edit = state.clints.data.filter((d) => d.id === payload.id);
    state.emps.data.splice(edit[0], 1, payload);
  },

};

const actions = {
  async getEmployee({ commit }, payload) {
    const { data } = await api.get(`${prefix}/show-table?${payload}`);
    commit("GET_EMP", await data);
    return data;
  },
  async getListEmployee({ commit }, payload) {
    const { data } = await api.get(`${prefix}?${payload}`);
    commit("GET_LISTE_MPLOYEE", await data);
    return data;
  },
  async deletEmployee({ commit }, payload) {
    const { data } = await api.delete(`${prefix}/${payload}`);
    commit("DELET_EMPLOYEE", await data);
    return data;
  },
  async updateEmployee({ commit }, payload) {
    const { data } = await api.post(`${prefix}`, payload);
    if (payload.id) commit("UPDATE_EMPLOYEE", await data);
    else commit("ADD_EMPLOYEE", await data);
    return data;
  },
};

const getters = {
  emps: (state) => {
    return state.emps;
  },
  empList: (state) => {
    return state.empList;
  },
};

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
};
