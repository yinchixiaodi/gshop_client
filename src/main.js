import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 注册store
import store from "./store";
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import "./mock/mockServer";
import "swiper/css/swiper.min.css";
Vue.config.productionTip = false;

// 注册全局组件
Vue.component("TypeNav", TypeNav);
Vue.component("Carousel", Carousel);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
