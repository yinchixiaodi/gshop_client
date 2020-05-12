<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(item, index) in skuImageList"
        :key="item.id"
      >
        <img
          :src="item.imgUrl"
          :class="{ active: currentIndex === index }"
          @click="changeIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { mapGetters } from "vuex";
export default {
  name: "ImageList",
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    ...mapGetters(["skuImageList"]),
  },
  watch: {
    skuImageList: {
      // 监视 skuImageList 的变化，一旦变化就创建swiper
      handler(value) {
        if (value.length === 0) return;
        // 在列表显示之后创建swiper对象
        this.$nextTick(() => {
          new Swiper(this.$refs.swiper, {
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            slidesPerView: 5, // 一次显示5页
            slidesPerGroup: 5, // 以5页为一个单位, 用于翻页
          });
        });
      },
      immediate: true,
    },
  },
  methods: {
    // 当小图的下标改变时调用改函数
    changeIndex(index) {
      if (this.currentIndex !== index) {
        this.currentIndex = index;
        // 给父组件传递数据，这里使用自定义事件
        this.$emit("changeCurrent", index);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
