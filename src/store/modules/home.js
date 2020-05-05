import { reqBaseCategoryList } from "@/api";

export default {
  state: {
    baseCategoryList: [],
  },
  mutations: {
    //   接收保存新的分类列表
    RECEIVE_BASE_CATEGORY_LIST(state, baseCategoryList) {
      state.baseCategoryList = baseCategoryList;
    },
  },
  actions: {
    //   发送异步ajax请求
    async getBaseCategoryList({ commit }) {
      const result = await reqBaseCategoryList();
      if (result.code === 200) {
        const baseCategoryList = result.data;
        commit("RECEIVE_BASE_CATEGORY_LIST", baseCategoryList);
      }
    },
  },
  getters: {},
};
