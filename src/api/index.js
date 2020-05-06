// 包含所有接口请求函数的模块
// 每个函数的返回值都是promise

import ajax from "./ajax";
import mockAjax from "./mockAjax";

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

//
export function reqBanners() {
  return mockAjax("/banners");
}
// export const reqBanners = () => mockAjax("/banners");
export const reqFloors = () => mockAjax("/floors");
