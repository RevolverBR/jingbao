<template>
  <div
    class="mask"
    v-if="showCart && calcutions.count > 0"
    @click="showCartFun"
  ></div>
  <div class="cart">
    <div class="content__right" v-if="showCart && calcutions.count > 0">
      <div class="content__header">
        <div
          class="content__header__chooseall"
          @click="() => allCheckChange(shopId)"
        >
          <span
            class="content__header__chooseall__icon iconfont"
            v-html="calcutions.allChecked ? '&#xe63a;' : '&#xe667;'"
          ></span>
          全选
        </div>
        <div class="content__header__clearcart">
          <span
            @click="() => cartClear(shopId)"
            class="content__header__clearcart__text"
          >
            清空购物车
          </span>
        </div>
      </div>
      <div class="content__item" v-for="item in productList" :key="item._id">
        <div
          class="content__item__checked iconfont"
          v-html="item.check ? '&#xe63a;' : '&#xe667;'"
          @click="() => changeCartItemCheck(shopId, item._id)"
        />
        <img class="content__item__img" :src="item.imgUrl" />
        <div class="content__item__details">
          <h4 class="content__item__title">{{ item.name }}</h4>
          <div class="content__item__price">
            <span class="content__item__curprice">&yen;{{ item.price }}</span>
            <span class="content__item__originprice"
              >&yen;{{ item.oldPrice }}</span
            >
          </div>
          <div class="content__item__number">
            <span
              class="content__item__minus"
              @click="
                () => {
                  changeCart(shopId, item._id, item, -1);
                }
              "
              >-</span
            >
            <span class="content__item__text">
              {{ item.count || 0 }}
            </span>
            <span
              class="content__item__plus"
              @click="
                () => {
                  changeCart(shopId, item._id, item, 1);
                }
              "
              >+</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check__icon" @click="showCartFun">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img"
        />
        <div class="check__icon__tag">{{ calcutions.count }}</div>
      </div>
      <div class="check__info">
        <span class="check__info__text">总计：</span>
        <span class="check__info__price">&yen; {{ calcutions.price }}</span>
      </div>
      <router-link :to="{ path: `/orderConfirmation/${shopId}` }">
        <div class="check__btn">去结算</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useChangeCartEffet } from "./commonCartEffect";

//购物车逻辑
const useCartEffect = (shopCart, cartList) => {
  const store = useStore();
  const route = useRoute();
  const shopId = route.params.id;

  // //非全选时使全选按钮关闭状态
  // const allChecked = computed(() => {
  //   const productList = cartList[shopId]?.productList;
  //   let result = true;
  //   if (productList) {
  //     for (let i in productList) {
  //       const product = productList[i];
  //       if (product.count > 0 && !product.check) {
  //         result = false;
  //       }
  //     }
  //   }
  //   return result;
  // });

  //添加到购物车的内容
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || [];
    return productList;
  });

  //购物车内容选中状态切换按钮事件
  const changeCartItemCheck = (shopId, productId) => {
    store.commit("changeCartItemCheck", {
      shopId,
      productId,
    });
    return { changeCartItemCheck };
  };

  //清空购物车
  const cartClear = (shopId) => {
    store.commit("cartClear", {
      shopId,
    });
    shopCart.value = false;
  };

  //全选按钮切换操作
  const allCheckChange = (shopId) => {
    store.commit("allCheckChange", { shopId });
  };

  return {
    productList,
    shopId,
    changeCartItemCheck,
    cartClear,
    allCheckChange,
  };
};

//购物车展示与否
const useShowCartEffect = () => {
  const showCart = ref(false);
  const showCartFun = () => {
    showCart.value = !showCart.value;
  };
  return { showCart, showCartFun };
};

export default {
  name: "Cart",
  setup() {
    const { showCart, showCartFun } = useShowCartEffect();
    const { cartList, changeCart, calcutions } = useChangeCartEffet();
    const {
      productList,
      shopId,
      changeCartItemCheck,
      cartClear,
      allCheckChange,
    } = useCartEffect(showCart, cartList);

    return {
      productList,
      changeCart,
      calcutions,
      shopId,
      changeCartItemCheck,
      cartClear,
      allCheckChange,
      showCart,
      showCartFun,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
@import "../../style/viriables.scss";
.mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.cart {
  z-index: 2;
}
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: 0.5rem;
  background-color: #fff;
  &__header {
    display: flex;
    line-height: 0.52rem;
    border: 0.01rem solid #fff;
    font-size: 0.14rem;
    color: #333333;
    &__chooseall {
      width: 0.64rem;
      margin-left: 0.16rem;
      text-align: left;
      &__icon {
        color: #0091ff;
        font-size: 0.23rem;
        vertical-align: top;
        margin-right: 0.06rem;
      }
    }
    &__clearcart {
      flex: 1;
      text-align: right;
      &__text {
        display: inline-block;
        width: 1.2rem;
        height: 100%;
        text-align: center;
      }
    }
  }
  &__right {
    overflow-y: scroll;
    width: 100%;
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid #f5f5f5;
    &__checked {
      line-height: 0.5rem;
      margin-right: 0.15rem;
      width: 0.2rem;
      height: 0.2rem;
      color: #0091ff;
      font-size: 0.23rem;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__details {
      overflow: hidden;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #333333;
      @include ellipsis;
    }
    &__curprice {
      display: inline-block;
      margin: 0.06rem 0.06rem 0 0;
      font-size: 0.14rem;
      color: #e93b3b;
      line-height: 0.2rem;
    }
    &__originprice {
      font-size: 0.1rem;
      color: #999999;
      line-height: 0.2rem;
      text-decoration: line-through;
    }
    &__number {
      position: absolute;
      right: 0.04rem;
      bottom: 0.2rem;
    }
    &__minus,
    &__plus {
      display: inline-block;
      width: 0.2rem;
      height: 0.2rem;
      font-size: 0.2rem;
      line-height: 0.2rem;
      text-align: center;
      border-radius: 50%;
      border: 0.01rem solid #666666;
      color: #666666;
    }
    &__minus {
      margin-right: 0.1rem;
    }
    &__plus {
      margin-left: 0.1rem;
      background-color: #0091ff;
      color: white;
    }
    &__text {
      display: inline-block;
      height: 100%;
      width: 0.16rem;
      font-size: 0.12rem;
      text-align: center;
      color: $content-font-color;
    }
  }
}
//cart
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
}
.check {
  display: flex;
  height: 0.5rem;
  border-top: 0.01rem solid #f1f1f1;
  line-height: 0.5rem;
  &__icon {
    width: 0.84rem;
    position: relative;
    &__img {
      display: block;
      margin: 0.12rem auto;
      width: 0.28rem;
      height: 0.26rem;
    }
    &__tag {
      position: absolute;
      min-width: 0.2rem;
      max-width: 0.6rem;
      height: 0.2rem;
      padding: 0 0.025rem;
      line-height: 0.2rem;
      text-align: center;
      background-color: #e93b3b;
      border-radius: 0.1rem;
      font-size: 0.12rem;
      left: 0.45rem;
      top: 0.04rem;
      transform: scale(0.5);
      transform-origin: left center;
      color: #fff;
    }
  }
  &__info {
    flex: 1;
    &__text {
      color: #333;
      font-size: 0.12rem;
    }
    &__price {
      color: #e93b3b;
      font-size: 0.18rem;
    }
  }
  &__btn {
    width: 0.98rem;
    background-color: #3fb0f9;
    text-align: center;
    color: #fff;
    font-size: 0.14rem;
  }
}
</style>