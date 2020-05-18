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
import VueLazyload from "vue-lazyload";
import loading from "@/assets/images/loading.gif";
// 配置vue的插件
Vue.use(VueLazyload, {
  // 内部自定义一个指令: lazy
  loading, // 配置loading图片
});

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
