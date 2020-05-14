import { getUsertempId } from "@/utils";
import { reqRegister, reqLogin } from "@/api";
export default {
  state: {
    userInfo: {},
    userTempId: getUsertempId(),
  },
  mutations: {
    RECEIVE_USER_INFO(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {
    // 注册的异步action
    async register({}, userInfo) {
      const result = await reqRegister(userInfo);
      if (result.code !== 200) {
        throw new Error(result.data || result.message || "注册失败");
      }
    },
    // 登录的异步action
    async login({ commit }, { mobile, password }) {
      const result = await reqLogin(mobile, password);
      if (result.code === 200) {
        const userInfo = result.data;
        commit("RECEIVE_USER_INFO", userInfo);
      } else {
        throw new Error(result.data || result.message || "注册失败");
      }
    },
  },
  getters: {},
};
