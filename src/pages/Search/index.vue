<template>
  <div>
    <TypeNav />
    <h3>params: {{ $route.params.keyword }}</h3>
    <h3>query: {{ $route.query.keyword2 }}</h3>
    <h3>params3: {{ keyword3 }}</h3>
    <h3>query4: {{ keyword4 }}</h3>
  </div>
</template>

<script>
export default {
  props: ["keyword3", "keyword4"],
  name: "Search",
};
</script>

<style lang="less" scoped></style>
