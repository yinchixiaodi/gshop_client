import Vue from "vue";
import Vuex from "vuex";
// import modules from "./modules";
Vue.use(Vuex);

import modules from "./modules";

const mutations = {};

const actions = {};

const getters = {};

export default new Vuex.Store({
  mutations,
  actions,
  getters,
  modules,
});
