<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHideFooter" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { reqBaseCategoryList, reqLogin } from "@/api";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  async mounted() {
    //测试接口请求函数
    const result = await reqBaseCategoryList();
    console.log(result);
    const result2 = await reqLogin("13700000000", "111111");
    console.log(result2);
  },
};
</script>

<style scoped></style>
