import { getUsertempId, saveUserInfo, getUserInfo } from "@/utils";
import { reqRegister, reqLogin } from "@/api";
export default {
  state: {
    userInfo: getUserInfo(),
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
        // 登录成功后将用户信息保存到localStorage
        saveUserInfo(userInfo);
      } else {
        throw new Error(result.data || result.message || "注册失败");
      }
    },
  },
  getters: {},
};
