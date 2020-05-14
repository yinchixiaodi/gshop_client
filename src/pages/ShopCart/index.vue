<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartList" :key="item.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked === 1"
              @change="itemCheckChange(item)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="itemChangeNum(item, -1)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @change="
                itemChangeNum(
                  item,
                  $event.target.value * 1 - item.skuNum,
                  $event
                )
              "
            />
            <!-- 改变的值是输入的值-原来的值↑ -->
            <a
              href="javascript:void(0)"
              class="plus"
              @click="itemChangeNum(item, 1)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuNum * item.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="isDelectItem(item)">
              删除
            </a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isCheckedAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteCheckItem">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{ totalCount }}</span>
          件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "ShopCart",
  computed: {
    ...mapState({
      cartList: (state) => state.shopCart.cartList,
    }),
    ...mapGetters(["totalCount", "totalPrice"]),
    isCheckedAll: {
      get() {
        /* return (
          this.cartList.filter((item) => item.isChecked === 1).length ===
          this.cartList.length
        ); */
        /* return (
          this.cartList.filter((item) => item.isChecked === 0).length === 0
        ); */
        // 是否有一个元素满足条件
        // return !this.cartList.some((item) => item.isChecked === 0);
        // 是否所有的元素都满足条件
        return this.cartList.every((item) => item.isChecked === 1);
      },
      // 监视 isCheckedAll 的变化 value的值是true/false
      async set(value) {
        try {
          const result = await this.$store.dispatch("checkAllChange", value);
          // 请求成功，重新获取购物车的数据
          this.$store.dispatch("getCartList");
        } catch (error) {
          alert(error.message);
        }
      },
    },
  },
  mounted() {
    // 一旦加载，读取购物车中的数据
    this.$store.dispatch("getCartList");
  },
  methods: {
    async itemCheckChange(item) {
      // 获取 skuID, isChecked
      const skuId = item.skuId;
      // 改变item 的isChecked ，如果当前是1，点击之后是0，如果当前是0，点击之后是1
      const isChecked = item.isChecked === 1 ? 0 : 1;
      try {
        await this.$store.dispatch("checkCartItem", { skuId, isChecked });
        this.$store.dispatch("getCartList");
      } catch (error) {
        alert(error.message);
      }
    },
    async itemChangeNum(item, changeNum, event) {
      // 修改的数量>0才需要更新
      if (item.skuNum + changeNum > 0) {
        // 传递的第二个参数是改变的数，点击加号就+1，点击减号就-1
        try {
          // 如果修改之后的数量<1,直接结束
          if (item.skuNum + changeNum < 1) return;
          await this.$store.dispatch("getAddToCart3", {
            skuId: item.skuId,
            skuNum: changeNum,
          });
          this.$store.dispatch("getCartList");
        } catch (error) {
          alert(error.message);
        }
      } else {
        event.target.value = item.skuNum;
      }
    },
    async isDelectItem(item) {
      if (window.confirm("确定要删除该的商品吗?")) {
        try {
          await this.$store.dispatch("deleteCartItem", { skuId: item.skuId });
          // 删除成功后，重新读取购物车中的数据
          this.$store.dispatch("getCartList");
        } catch (error) {
          alert(error.message);
        }
      }
    },
    async deleteCheckItem() {
      if (window.confirm("确定要删除所选的商品吗?")) {
        try {
          await this.$store.dispatch("deleteAllCheck");
          this.$store.dispatch("getCartList");
        } catch (error) {
          alert(error.message);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 5%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 30%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 15%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 5%;
        }

        .cart-list-con2 {
          width: 30%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 15%;
        }

        .cart-list-con5 {
          width: 15%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 15%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 15%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
