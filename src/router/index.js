import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
Vue.use(VueRouter);

// 修正原型上的方法
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location, onComplete, onAbort) {
  if (onComplete || onAbort) {
    originPush.call(this, location, onComplete, onAbort);
  } else {
    return originPush.call(this, location, onComplete, onAbort).catch(() => {
      return new Promise(() => {});
    });
  }
};

VueRouter.prototype.replace = function(location, onComplete, onAbort) {
  if (onComplete || onAbort) {
    originReplace.call(this, location, onComplete, onAbort);
  } else {
    return originReplace.call(this, location, onComplete, onAbort).catch(() => {
      return new Promise(() => {});
    });
  }
};

const store = new VueRouter({
  mode: "history",
  routes,
});

export default store;
