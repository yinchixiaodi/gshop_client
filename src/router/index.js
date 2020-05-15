import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";
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

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }; // 在跳转路由时, 滚动条自动滚动到x轴和y轴的起始位置
  },
});

// 设置全局路由守卫  只有登陆了, 才能查看交易/支付/个人中心界面
// 所有以交易/支付/个人中心开头的路径都需要检查
const checkPaths = ["/trade", "/pay", "/center"];
router.beforeEach((to, from, next) => {
  // 判断是不是需要检查的路径
  const targetPath = to.path;
  const isCheckPah = checkPaths.some((path) => targetPath.indexOf(path) !== -1);
  if (isCheckPah) {
    // 判断是不是已经登录了，如果登录了直接放行，否则强制跳转到登录页面
    if (store.state.user.userInfo.name) {
      next();
    } else {
      next("login?redirect=" + targetPath);
    }
  } else {
    // 直接放行
    next();
  }
});

export default router;
