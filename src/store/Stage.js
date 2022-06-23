// import { Cookies, Notify } from "quasar";
import { api } from "../boot/axios";

const prefix = "stage";

const state = {
  stages: {},
  stageList:[]
};

const mutations = {
  GET_STAGES(state, payload) {
    state.stages = payload;
  },
  GET_STAGE_LIST(state, payload) {
    state.stageList = payload;
  },
  DELET_STAGE(state, payload) {
    let Index = state.emps.findIndex((d) => d.id === payload.id);
    state.stages.data.splice(Index, 1);
  },
  ADD_STAGE(state, payload) {
    state.stages.data.push(payload);
  },
  UPDATE_STAGE(state, payload) {
    let edit = state.stage.data.filter((d) => d.id === payload.id);
    state.stages.data.splice(edit[0], 1, payload);
    // Object.assign(edit[0], payload);
  },
};

const actions = {
  async getStages({ commit }, payload) {
    const { data } = await api.get(`${prefix}/show-table?${payload}`);
    commit("GET_STAGES", await data);
    return data;
  },
  async getStageList({ commit }, payload) {
    const { data } = await api.get(`${prefix}?${payload}`);
    commit("GET_STAGE_LIST", await data);
    return data;
  },
  async deletStage({ commit }, payload) {
    const { data } = await api.delete(`${prefix}/${payload}`);
    commit("DELET_STAGE", await data);
    return data;
  },
  async updatStage({ commit }, payload) {
    const { data } = await api.post(`${prefix}`, payload);
    await console.log(data);
    if (payload.id) commit("UPDATE_STAGE", await data);
    else commit("ADD_STAGE", await data);
    return data ;
  },
};

const getters = {
  stages: (state) => {
    return state.stages;
  },
  stageList: (state) => {
    return state.stageList;
  },
};

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
};
