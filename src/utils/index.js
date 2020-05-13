// 包含所有的工具函数

import { v4 as uuidv4 } from "uuid";

export function getUsertempId() {
  // 如果 localStorage 中有，就直接读取 localStorage 中的
  let userTempId = window.localStorage.getItem("USER_TEMP_ID");
  // 如果 localStorage 中没有，就使用UUID创建
  if (!userTempId) {
    userTempId = uuidv4();
    window.localStorage.setItem("USER_TEMP_ID", userTempId);
  }
  return userTempId;
}
