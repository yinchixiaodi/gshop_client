// 包含所有接口请求函数的模块

import ajax from "./ajax";

// 请求获取三级分类列表  /api/product/getBaseCategoryList
export function reqBaseCategoryList() {
  return ajax("/product/getBaseCategoryList");
}

// 请求登录  /api/user/passport/login
export function reqLogin(mobile, password) {
  return ajax({
    method: "POST",
    url: "/user/passport/login",
    data: { mobile, password },
  });
}
