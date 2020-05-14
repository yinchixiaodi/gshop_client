import { getUsertempId } from "@/utils";
import { reqRegister } from "@/api";
export default {
  state: {
    userInfo: {},
    userTempId: getUsertempId(),
  },
  mutations: {
    // 注册的异步action
  },
  actions: {
    async register({}, userInfo) {
      const result = await reqRegister(userInfo);
      if (result.code !== 200) {
        throw new Error(result.message || "注册失败");
      }
    },
  },
  getters: {},
};
