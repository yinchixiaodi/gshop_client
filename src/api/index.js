// 包含所有接口请求函数的模块
// 每个函数的返回值都是promise

import ajax from "./ajax";
import mockAjax from "./mockAjax";

// 请求获取三级分类列表  /api/product/getBaseCategoryList
export function reqBaseCategoryList() {
  return ajax("/product/getBaseCategoryList");
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

// 添加购物车(对已有物品进行数量改动)
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddToCart = (skuId, skuNum) => {
  return ajax.post(`/cart/addToCart/${skuId}/${skuNum}`);
};

// 获取购物车列表
// '/api/cart/cartList'
export const reqCartList = () => ajax("/cart/cartList");

// 切换商品选中状态  isChecked 1代表选中， 0代表取消选中
/* /api/cart/checkCart/{skuID}/{isChecked}
 */
export const reqCheckCartItem = (skuID, isChecked) =>
  ajax(`/cart/checkCart/${skuID}/${isChecked}`);

// 删除购物车商品
/* /api/cart/deleteCart/{skuId} */
export const reqDeleteCartItem = (skuId) =>
  ajax.delete(`/cart/deleteCart/${skuId}`);

// 登录
/* 
/api/user/passport/login
POST 
*/
// 请求登录  /api/user/passport/login
export function reqLogin(mobile, password) {
  return ajax({
    method: "POST",
    url: "/user/passport/login",
    data: { mobile, password },
  });
}
// 注册  /api/user/passport/register  POST
// 手机号、密码、验证码
export function reqRegister(userInfo) {
  return ajax({
    method: "POST",
    url: "/user/passport/register",
    data: userInfo,
  });
}
// 退出登录  /api/user/passport/logout
export const reqLoginOut = () => {
  return ajax("/user/passport/logout");
};
