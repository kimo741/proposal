import Vue from "vue";
import Vuex from "vuex";
import global from "./Global.js";
import User from "./Users.js";
import Cat from "./Categories.js";
import Permissions from "./Permissions.js";
import Client from "./Client.js";
import Employee from "./Employee.js";
import Item from "./Item.js";
import Stage from "./Stage.js";
import Setting from "./Setting.js";
import Process from "./Process.js";

Vue.use(Vuex);

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      User,
      Cat,
      global,
      Permissions,
      Client,
      Employee,
      Item,
      Stage,
      Process,
      Setting,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING,
  });

  return Store;
}
