import Vue from "vue";
import Vuex from "vuex";

import RepositoryStore from "./RespositoryStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    RepositoryStore
  },
  state: {
    access_token: null,
    user: null
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.access_token = payload;
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
    CLEAR(state) {
      state.access_token = null;
      state.user = null;
    }
  },
  actions: {}
});
