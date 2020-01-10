import Vue from "vue";
import Vuex from "vuex";

import RepositoryStore from "./RespositoryStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    RepositoryStore
  },
  state: {
    access_token: null
  },
  mutations: {
    SET_ACCESS_TOKEN(state, payload) {
      state.access_token = payload;
    },
    CLEAR(state) {
      state.access_token = null;
    }
  },
  actions: {}
});
