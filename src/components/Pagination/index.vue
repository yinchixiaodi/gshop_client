<template>
  <div class="pagination">
    <button
      :disabled="myCurrentPage === 1"
      @click="setCurrentPage(myCurrentPage - 1)"
    >
      上一页
    </button>
    <!-- <button v-show="myCurrentPage !== 1">1</button> -->
    <button v-show="startEnd.start > 1" @click="setCurrentPage(1)">1</button>
    <button disabled v-if="startEnd.start > 2">···</button>

    <button
      v-for="item in startEnd.end"
      :key="item"
      v-if="item >= startEnd.start"
      :class="{ active: item === myCurrentPage }"
      @click="setCurrentPage(item)"
    >
      {{ item }}
    </button>

    <button disabled v-show="startEnd.end < totalPage - 1">···</button>
    <button
      v-show="startEnd.end < totalPage"
      @click="setCurrentPage(totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="myCurrentPage === totalPage"
      @click="setCurrentPage(myCurrentPage - 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px" disabled>共 {{ total }} 条</button>
  </div>
</template>

<script>
/*
    currentPage: 当前页码
    pageSize: 每页数量
    total: 总数量
    showPageNo: 连续数码数
*/
export default {
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 5,
    },
    showPageNo: {
      type: Number,
      default: 5,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      myCurrentPage: this.currentPage,
    };
  },
  computed: {
    // 计算总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算连续页码的开始页码和结束页码
    // 需要知道当前页 连续页数 总页数
    startEnd() {
      let start, end;
      const { myCurrentPage, showPageNo, totalPage } = this;
      // 34[5]67 5 5 8
      start = myCurrentPage - Math.floor(showPageNo / 2);
      //1[2]34
      if (start <= 0) {
        start = 1;
      }
      //34[5]67  3 + 5 - 1 = 7
      end = start + showPageNo - 1;
      // 56[7]8'9'   456[7]8
      if (end > totalPage) {
        end = totalPage;
        start = end - showPageNo + 1;
        // myCurrentPage, showPageNo, total
        //      3             5         4
        //start 1  ,end 5 -> 4,  start -> 0
        if (start <= 0) {
          start = 1;
        }
      }
      return { start, end };
    },
  },
  watch: {
    // 监视 currentPage 属性，当父组件的 currentPage 发生改变时，相应的子组件的 myCurrentPage 也应该发生改变
    currentPage(value) {
      this.myCurrentPage = value;
    },
  },
  methods: {
    setCurrentPage(page) {
      this.myCurrentPage = page;
      // 当子组件的页码发生变化时，要将最新的页码传递给父组件，使用自定义事件
      this.$emit("currentChange", page);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
