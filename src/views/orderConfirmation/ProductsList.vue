<template>
  <div class="products">
    <div class="products__title">{{ shopName }}</div>
    <div class="products__list">
      <div class="products__item" v-for="item in productList" :key="item._id">
        <img class="products__item__img" :src="item.imgUrl" />
        <div class="products__item__details">
          <h4 class="products__item__name">{{ item.name }}</h4>
          <div class="products__item__price">
            <span class="products__item__curprice"
              >&yen;({{ item.price }} * {{ item.count }})</span
            >
            <span class="products__item__totalprice"
              >&yen;{{ (item.count * item.price).toFixed(2) }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useChangeCartEffet } from "../shop/commonCartEffect";

export default {
  name: "ProductsList",
  setup() {
    const { productList, shopName } = useChangeCartEffet();

    return { productList, shopName };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
//购买内容
.products {
  position: absolute;
  overflow-y: scroll;
  left: 0;
  right: 0;
  top: 1.8rem;
  bottom: 0.5rem;
  margin: 0.16rem 0.18rem 0 0.18rem;
  background-color: #fff;
  &__title {
    margin: 0.16rem;
    font-size: 0.16rem;
    color: #333333;
  }
  &__list {
    position: absolute;
    left: 0;
    right: 0;
    top: 0.36rem;
    bottom: 0;
    overflow-y: scroll;
  }
  &__item {
    position: relative;
    display: flex;
    margin: 0.16rem;
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__details {
      flex: 1;
    }
    &__name {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #333333;
      @include ellipsis;
    }
    &__price {
      display: flex;
      justify-content: space-between;
      font-size: 0.14rem;
      line-height: 0.2rem;
    }
    &__curprice {
      color: #e93b3b;
      margin-right: 0.06rem;
    }
    &__totalprice {
      color: #000000;
      text-align: right;
    }
  }
}
</style>