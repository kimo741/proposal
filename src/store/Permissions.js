import { Cookies, Notify } from 'quasar'
import {api} from '../boot/axios'

const prefix = 'dashboard/permission'

const state = {
  permissions: [],
  listOfPermissions: [],
  assgendPermissions: [],
  permission: {},
};

const mutations = {

   GET_PERMISSIONS(state, payload) {
    state.permissions = payload;
  },

   GET_PERMISSIONS_LIST(state, payload) {
    state.listOfPermissions = payload;
  },

  GET_PERMISSION(state, payload) {
    state.permission = payload;
  },

  GET_AssgendPermissions(state, payload) {
    state.assgendPermissions = payload;
  },

};

const actions = {

  async getPermissions ( {commit}, payload ) {
    const {data} = await api.get(`permission/show-table?${payload}`)
    commit('GET_PERMISSIONS', await data)
    return data
  },

  async getPermissionsList ( {commit}, payload ) {
    const {data} = await api.get(`permission/select-list?${payload}`)
    commit('GET_PERMISSIONS_LIST', await data)
    return data
  },

  async getPermission ( {commit}, payload ) {
    const {data} = await api.get(`${prefix}/${payload}`);
    commit('GET_PERMISSION', await data)
    return data
  },

  async getAssgendPermissions ( {commit}, payload ) {
    const {data} = await api.get(`${prefix}/check/${payload}`);
    commit('GET_AssgendPermissions', await data)
    return data
  },

};

const getters = {

  permissions: state => {
    return state.permissions;
  },

  listOfPermissions: state => {
    return state.listOfPermissions
  },

  permission: state => {
    return state.permission;
  },

  assgend: state => {
    return state.assgendPermissions;
  },

};

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
};
