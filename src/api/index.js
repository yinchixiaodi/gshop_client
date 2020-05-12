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

// 根据搜索的条件参数对象获取商品列表数据
export const reqProductList = (searchParams) =>
  ajax({
    url: "/list",
    method: "POST",
    data: searchParams,
  });
/* reqProductList({
  category3Id: "61",
  categoryName: "手机",
  keyword: "小米",
  order: "1:desc",
  pageNo: 1,
  pageSize: 10,
  props: ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  trademark: "4:小米",
}); */
// 根据点击的商品动态显示商品信息
export const reqDetail = (skuId) => {
  return ajax(`/item/${skuId}`);
};

// 添加购物车
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddToCart = (skuId, skuNum) => {
  return ajax.post(`/cart/addToCart/${skuId}/${skuNum}`);
};
