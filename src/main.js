import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import tinymce from "vue-tinymce-editor";
Vue.component("tinymce", tinymce);

import "./assets/styles/index.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
