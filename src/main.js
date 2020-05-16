import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 注册store
import store from "./store";
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
import "./mock/mockServer";
import "swiper/css/swiper.min.css";
import * as API from "@/api";
import "./validate";
import "./elements";
Vue.config.productionTip = false;

// 注册全局组件
Vue.component("TypeNav", TypeNav);
Vue.component("Carousel", Carousel);
Vue.component("Pagination", Pagination);

Vue.prototype.$API = API;

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
