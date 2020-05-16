/* element-ui的相关配置 */
import Vue from "vue";

// 按需引入element里面的组件
import { Pagination, Message, MessageBox } from "element-ui";

Vue.component(Pagination.name, Pagination);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
