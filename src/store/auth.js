import { Cookies, Notify } from "quasar";
import { api } from "../boot/axios";
// import  { Cookies } from "quasar";
// http://levener.build/api/dashboard/user/${payload}
const prefix = "api";

const state = {
  info:""
};

const mutations = {
  ADMIN_LOGIN(state, payload) {
    state.cats = payload;
  },
  getUserInfo(state, payload) {
    state.cats = payload;
  },
};

const actions = {
  async AdminLogin({ commit }, payload) {
    const { data } = await api.post(`${prefix}/Login`, payload)
    .then( ({data}) => {
      Cookies.set('token', data)
    })
    commit("ADMIN_LOGIN", await data);
    return data;
  },
  async getUserInfo({ commit }, payload) {
    const { data } = await api.get(`${prefix}/Login${payload}`);
    commit("STUF_LOGIN", await data);
    return data;
    commit('getUserInfo')
  },
};
// {{dom}}/api/Login?email=m@m.com&password=123456

const getters = {
  // cats: (state) => {
  //   return state.cats;
  // },

};

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
};
