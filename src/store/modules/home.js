import { reqBaseCategoryList, reqBanners, reqFloors } from "@/api";

export default {
  state: {
    baseCategoryList: [],
    banners: [],
    floors: [],
  },
  mutations: {
    //   收保存新的分类列表
    RECEIVE_BASE_CATEGORY_LIST(state, baseCategoryList) {
      state.baseCategoryList = baseCategoryList;
    },
    RECEIVE_BANNERS(state, banners) {
      state.banners = banners;
    },
    RECEIVE_FLOORS(state, floors) {
      state.floors = floors;
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
    async getBanners({ commit }) {
      const result = await reqBanners();
      if (result.code === 200) {
        const banners = result.data;
        commit("RECEIVE_BANNERS", banners);
      }
    },
    async getFloors({ commit }) {
      const result = await reqFloors();
      if (result.code === 200) {
        const floors = result.data;
        commit("RECEIVE_FLOORS", floors);
      }
    },
  },
  getters: {},
};
