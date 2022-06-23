import Vue from "vue";
import axios from "axios";
import { date } from "quasar";

let headers = {
  header: {
    "Content-Type":
      "multipart/form-data; charset=utf-8; boundary=" +
      Math.random().toString().substr(2),
    "Access-Control-Allow-Origin": "*",
  },
  processData: false,
  contentType: false,
};

const local = " http://draya.build/";
const server = "https://api.yalla2print.com/";
const domain = local;

const api = axios.create({
  baseURL: domain + "api/",
  withCredentials: false,
  headers,
});

// api.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   config.headers["Authorization"] =
//     "Bearer 1|TZ8MlgAeBa3shMYHw8fX34WxOjSqVOTP3T0yUgPZ";
//   return config;
// });

Vue.prototype.$axios = api;
Vue.prototype.$storage = domain + "storage/";

export { api };
