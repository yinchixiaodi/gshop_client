import {
  reqCartList,
  reqCheckCartItem,
  reqAddToCart,
  reqDeleteCartItem,
} from "@/api";
const state = {
  cartList: [],
};

const mutations = {
  RECEIVE_CART_LIST(state, cartList) {
    state.cartList = cartList;
  },
};

const actions = {
  async getCartList({ commit }) {
    const result = await reqCartList();
    if (result.code == 200) {
      const cartList = result.data;
      commit("RECEIVE_CART_LIST", cartList);
    }
  },
  // 改变一个指定购物项的勾选状态
  async checkCartItem({ commit }, { skuId, isChecked }) {
    const result = await reqCheckCartItem(skuId, isChecked);
    if (result.code !== 200) {
      // 请求失败
      throw new Error(result.message);
    }
  },
  async checkAllChange({ commit, state, dispatch }, checked) {
    const isChecked = checked ? 1 : 0;
    //  遍历所有的item ，当所有的都是成功的才请求成功
    let promises = [];
    state.cartList.forEach((item) => {
      if (item.isChecked === isChecked) return;
      // 将购物车列表每一项分发给 checkCartItem ，让他去请求更新某个购物项的勾选状态
      //   这加了个await报错？？？
      const promise = dispatch("checkCartItem", {
        skuId: item.skuId,
        isChecked,
      });
      promises.push(promise);
    });
    return Promise.all(promises);
  },
  async getAddToCart({ commit }, { skuId, skuNum, callback }) {
    const result = await reqAddToCart(skuId, skuNum);
    if (result.code === 200) {
      // 添加购物车成功
      console.log("添加购物车成功");
      // callback(""); //不传递任何信息代表添加购物车成功
      callback({ status: 0, message: "添加购物车成功" });
    } else {
      // 添加购物车失败
      console.log("添加购物车失败");
      // callback("添加购物车失败"); //传递信息代表添加购物车失败
      callback({ status: 1, message: "添加购物车失败" });
    }
  },
  async getAddToCart2({ commit }, { skuId, skuNum, callback }) {
    const result = await reqAddToCart(skuId, skuNum);
    if (result.code === 200) {
      // 添加购物车成功
      console.log("添加购物车成功");
      return "";
    } else {
      // 添加购物车失败
      console.log("添加购物车失败");
      return "添加购物车失败";
    }
  },
  async getAddToCart3({ commit }, { skuId, skuNum }) {
    const result = await reqAddToCart(skuId, skuNum);
    if (result.code === 200) {
      // 添加购物车成功
      // console.log("添加购物车成功");
      // return Promise.resolve("添加购物车成功");
      return "";
    } else {
      // 添加购物车失败
      // console.log("添加购物车失败");
      throw new Error("添加购物车失败");
    }
  },
  // 删除一个指定的购物项
  async deleteCartItem({ commit }, { skuId }) {
    const result = await reqDeleteCartItem(skuId);
    if (result.code !== 200) {
      // 请求失败
      throw new Error(result.message);
    }
  },
  // 删除已选中的
  async deleteAllCheck({ state, dispatch }) {
    //   遍历所有的item，查看选中的

    const promises = state.cartList.reduce((pre, item) => {
      if (item.isChecked === 1) {
        pre.push(dispatch("deleteCartItem", { skuId: item.skuId }));
      }
      return pre;
    }, []);
    return Promise.all(promises);
  },
};

const getters = {
  // 已选中商品的总数量
  totalCount(state) {
    //  reduce用来 做累计累加操作，
    // 第一个参数是一个回调函数，回调函数的第一个参数是上一次的结果，第二个参数是数组的每一项
    // 第二个参数是累加的初始值
    return state.cartList.reduce((pre, item) => {
      return item.isChecked === 1 ? pre + item.skuNum : pre;
    }, 0);
  },
  // 已选中商品的总价格
  totalPrice(state) {
    return state.cartList.reduce((pre, item) => {
      return item.isChecked === 1 ? pre + item.skuNum * item.cartPrice : pre;
    }, 0);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
