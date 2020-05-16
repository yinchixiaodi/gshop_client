import { reqTradeInfo, reqPayInfo } from "@/api";

const state = {
  tradeInfo: {}, // 交易信息
  payInfo: {}, // 支付信息
};
const mutations = {
  RECEIVE_TRADE_INFO(state, tradeInfo) {
    state.tradeInfo = tradeInfo;
  },
  RECEIVE_PAY_INFO(state, payInfo) {
    state.payInfo = payInfo;
  },
};
const actions = {
  async getTraderInfo({ commit }) {
    const result = await reqTradeInfo();
    if (result.code === 200) {
      const tradeInfo = result.data;
      commit("RECEIVE_TRADE_INFO", tradeInfo);
    }
  },
  async getPayInfo({ commit }, orderId) {
    const result = await reqPayInfo(orderId);
    if (result.code === 200) {
      const payInfo = result.data;
      commit("RECEIVE_PAY_INFO", payInfo);
    }
  },
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
