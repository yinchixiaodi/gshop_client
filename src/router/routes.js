import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";

import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
import MyOrder from "@/pages/Center/MyOrder";
import GroupBuy from "@/pages/Center/GroupBuy";

import store from "@/store";

export default [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
    meta: {
      isHideFooter: true,
    },
    beforeEnter: (to, from, next) => {
      console.log("beforEnter()", to, from);
      // 如果没有还没有登录，放行，如果已经登录强制跳转到首页
      if (store.state.user.userInfo.token) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      isHideFooter: true,
    },
  },
  {
    name: "searching",
    path: "/search/:keyword?",
    component: Search,
    props: (route) => ({
      keyword3: route.params.keyword,
      keyword4: route.query.keyword2,
    }),
  },
  {
    name: "detail",
    path: "/detail/:skuId",
    component: Detail,
  },
  {
    path: "/addCartSuccess",
    component: AddCartSuccess,
    // 只有携带的skuNum以及sessionStorage中有skuInfo数据, 才能查看添加购物车成功的界面
    beforeEnter: (to, from, next) => {
      const skuNum = to.query.skuNum;
      const skuInfo = JSON.parse(window.sessionStorage.getItem("SAVE_SKUINFO"));
      if (skuNum && skuInfo) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/shopcart",
    component: ShopCart,
  },
  {
    path: "/trade",
    component: Trade,
    // 只能从购物车界面, 才能跳转到交易界面
    beforeEnter: (to, from, next) => {
      // console.log("111", to, from);
      if (from.path === "/shopcart") {
        next();
      } else {
        next("/shopcart");
      }
    },
  },
  {
    path: "/pay",
    component: Pay,
    // 只能从交易界面, 才能跳转到支付界面
    beforeEnter: (to, from, next) => {
      // console.log("111", to, from);
      if (from.path === "/trade") {
        next();
      } else {
        next("/shopcart");
      }
    },
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    beforeEnter: (to, from, next) => {
      // console.log("111", to, from);
      if (from.path === "/pay") {
        next();
      } else {
        next("/shopcart");
      }
    },
  },
  {
    path: "/center",
    component: Center,
    children: [
      {
        path: "myorder",
        component: MyOrder,
      },
      {
        path: "groupbuy",
        component: GroupBuy,
      },
      {
        path: "",
        redirect: "myorder",
      },
    ],
  },
];
