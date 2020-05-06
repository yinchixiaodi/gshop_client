import Mock from "mockjs";
// 得到的是一个 json 数组
import banners from "./banners.json";
import floors from "./floors.json";

// 模拟返回轮播图接口的数据
Mock.mock("/mock/banners", { code: 200, data: banners });

// 模拟返回楼层接口的数据
Mock.mock("/mock/floors", { code: 200, data: floors });

console.log("mock返回的数据");
