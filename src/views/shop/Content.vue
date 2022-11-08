<template>
  <div class="content">
    <div class="content__left">
      <div
        :class="{
          content__type: true,
          'category__type--active': currentTab === item.tab,
        }"
        v-for="item in categories"
        :key="item.name"
        @click="() => handleTabClick(item.tab)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="content__right">
      <div class="content__item" v-for="item in list" :key="item._id">
        <img class="content__item__img" :src="item.imgUrl" />
        <div class="content__item__details">
          <h4 class="content__item__title">{{ item.name }}</h4>
          <p class="content__item__sales">月售{{ item.sales }}件</p>
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
                  changeCartFun(shopId, item._id, item, -1, shopName);
                }
              "
              >-</span
            >
            <span class="content__item__text">
              {{ getProductCartCount(shopId, item._id) }}
            </span>
            <span
              class="content__item__plus"
              @click="
                () => {
                  changeCartFun(shopId, item._id, item, 1, shopName);
                }
              "
              >+</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { get } from "../../utils/request";
import { useChangeCartEffet } from "./commonCartEffect";
import { useStore } from "vuex";

const categories = [
  { name: "全部商品", tab: "all" },
  { name: "秒杀", tab: "seckill" },
  { name: "新鲜水果", tab: "frult" },
];

//tab相关逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab);
  const handleTabClick = (tab) => {
    currentTab.value = tab;
  };
  return { currentTab, handleTabClick };
};

//列表内容相关逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] });

  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value,
    });
    if (result?.errno === 0 && result?.data?.length) {
      content.list = result.data;
    }
  };

  watchEffect(() => {
    getContentData();
  });

  const { list } = toRefs(content);

  return { list };
};

//我也不知道
const useCartEffect = () => {
  const store = useStore();
  const { cartList, changeCart } = useChangeCartEffet();
  const changeShopName = (shopId, shopName) => {
    store.commit("changeShopName", { shopId, shopName });
  };

  const changeCartFun = (shopId, productId, item, num, shopName) => {
    changeCart(shopId, productId, item, num);
    changeShopName(shopId, shopName);
  };

  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }
  return { cartList, changeShopName, changeCartFun, getProductCartCount };
};

export default {
  name: "Content",
  props: ["shopName"],
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { currentTab, handleTabClick } = useTabEffect();
    const { list } = useCurrentListEffect(currentTab, shopId);
    const { cartList, changeShopName, changeCartFun, getProductCartCount } = useCartEffect();

    return {
      categories,
      shopId,
      currentTab,
      handleTabClick,
      list,
      cartList,
      changeShopName,
      changeCartFun,
      getProductCartCount,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: 0.5rem;
  &__left {
    overflow-y: scroll;
    height: 100%;
    width: 0.76rem;
    background: #f5f5f5;
  }
  &__type {
    margin: 0.16rem 0 0.24rem;
    font-size: 0.14rem;
    color: #333333;
    line-height: 0.16rem;
    text-align: center;
    &--active {
      background-color: $content-bg-color;
    }
  }
  &__right {
    overflow-y: scroll;
    width: 80%;
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid #f5f5f5;
    &__img {
      width: 0.68rem;
      height: 0.68rem;
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
    &__sales {
      margin: 0.06rem 0;
      line-height: 0.16rem;
      font-size: 0.12rem;
      color: #333333;
    }
    &__curprice {
      font-size: 0.14rem;
      color: #e93b3b;
      line-height: 0.2rem;
      margin-right: 0.06rem;
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
      bottom: 0.12rem;
    }
    &__minus,
    &__plus {
      display: inline-block;
      min-width: 0.2rem;
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
</style>