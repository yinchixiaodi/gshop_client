import { reqDetail, reqAddToCart } from "@/api";

const state = {
  detailInfo: {},
};

const mutations = {
  RECEIVE_DETAIL_INFO(state, detailInfo) {
    state.detailInfo = detailInfo;
  },
};

const actions = {
  async getProduct({ commit }, skuId) {
    const result = await reqDetail(skuId);
    if (result.code === 200) {
      const detailInfo = result.data;
      commit("RECEIVE_DETAIL_INFO", detailInfo);
    }
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
};

const getters = {
  categoryView(state) {
    const categoryView = state.detailInfo.categoryView;
    return categoryView || {};
  },
  skuInfo(state) {
    const skuInfo = state.detailInfo.skuInfo;
    return skuInfo || {};
  },
  skuImageList(state) {
    const skuInfo = state.detailInfo.skuInfo;
    return skuInfo ? skuInfo.skuImageList : [];
  },
  spuSaleAttrList(state) {
    const spuSaleAttrList = state.detailInfo.spuSaleAttrList;
    return spuSaleAttrList || [];
  },
  spuSaleAttrValueList(state) {
    const spuSaleAttrList = state.detailInfo.spuSaleAttrList;
    return spuSaleAttrList ? spuSaleAttrList.spuSaleAttrValueList : [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
