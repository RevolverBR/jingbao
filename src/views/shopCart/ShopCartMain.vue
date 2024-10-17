<template>
  <div class="wrapper">
    <div class="header">
      <div class="header__top">
        <div class="header__top__back iconfont">
          <router-link :to="`/shop/${shopId}`"> &#xe697; </router-link>
        </div>
        确认订单
      </div>
      <div class="header__detail">
        <div class="header__detail__title">收货地址</div>
        <div class="header__detail__address">xxx小区</div>
        <div class="header__detail__info">
          <span class="header__detail__name">c先生</span>
          <span class="header__detail__tel">123456789</span>
        </div>
        <div class="header__detail__icon iconfont">&#xe697;</div>
      </div>
    </div>

    <div class="content">
      <div class="content__title">{{ cartList?.[shopId]?.shopName }}</div>
      <div class="content__products">
        <div
          class="content__product"
          v-for="item in cartComputed.productList"
          :key="item.id"
        >
          <img class="content__product__img" :src="item.imgUrl" alt="" />
          <div class="content__product__detail">
            <div class="content__product__title">{{ item.name }}</div>
            <div class="content__product__price">&yen;{{item.price}} * {{item.count}}</div>
            <div class="content__product__totalprice">
              共 &yen;{{ item.count * item.price }}
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="content__more iconfont">总计&#xe697;</div> -->
    </div>

    <div class="foot">
      <div class="foot__price">实付金额 &yen;{{ cartComputed.totalPrice }}</div>
      <div class="foot__confirm" @click="handleShowOrder">提交订单</div>
    </div>
  </div>
  <Order v-if="showOrder" />
</template>

<script>
import { ref } from 'vue';
import { useCartEffect } from '../shop/cartCommonEffect';
import Order from './Order.vue';

export default {
  name: 'ShopCart',
  components: { Order },
  setup() {
    let showOrder = ref(false)
    const { cartComputed, shopId, cartList } = useCartEffect()
    const handleShowOrder = () => {
      showOrder.value = true
      console.log(showOrder)
    }

    return { cartComputed, shopId, cartList, handleShowOrder, showOrder }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
.wrapper {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #eee;
  z-index: 10;
}
.header {
  z-index: 10;
  // position: relative;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-repeat: no-repeat;
  background-image: linear-gradient(180deg, #1d43ec 0%, #ffffff 100%);
  &__top {
    position: relative;
    padding-top: .4rem;
    line-height: .24rem;
    text-align: center;
    color: #fff;
    font-size: .16rem;
    &__back{
      position: absolute;
      left: .18rem;
    }
    a {
      color: #fff;
      text-decoration: none;
      font-size: .24rem;
    }
  }
  &__detail {
    position: absolute;
    left: .18rem;
    right: .18rem;
    height: 1.11rem;
    bottom: 0;
    border-radius: .04rem;
    background-color: #fff;
    &__title{
      padding: .16rem 0 .14rem .16rem;
      line-height: .22rem;
      font-size: .16rem;
      color: #333;
    }
    &__address {
      padding: 0 .3rem 0 .16rem;
      line-height: .2rem;
      font-size: .16rem;
      color: #333;
    }
    &__info {
      padding: .06rem 0 0 .16rem;
    }
    &__name {
      margin-right: .06rem;
      font-size: .12rem;
      color: #666;
      line-height: .18rem;
    }
    &__tel {
      font-size: .12rem;
      color: #666;
    }
    &__icon {
      position: absolute;
      width: .2rem;
      height: .2rem;
      right: .06rem;
      bottom: .44rem;
      font-size: .2rem;
      transform: rotate(180deg);
    }
  }
}
.content {
  z-index: 5;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.9rem;
  margin: 0.16rem .18rem .55rem .18rem;
  background-color: #fff;
  &__title {
    padding: .16rem 0 0 .16rem;
    font-size: .14rem;
  }
  &__products {
    margin-bottom: .6rem;
  }
  &__product {
    position: relative;
    display: flex;
    padding: .16rem;
    &__img {
      width: 0.68rem;
      height: 0.68rem;
      margin-right: 0.46rem;
      margin-left: 0.16rem;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #333;
      @include ellipsis;
    }
    &__price {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #e93b3b;
    }
    &__totalprice {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #e93b3b;
    }
  }
}
.foot {
  z-index: 10;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: .5rem;
  line-height: .5rem;
  background: #fff;
  display: flex;
  font-size: .16rem;
  &__price {
    margin: 0 1rem 0 .4rem;
    width: 1.6rem;
  }
  &__confirm {
    position: absolute;
    background-color: #4fb0f9;;
    right: 0;
    width: 1.2rem;
    text-align: center;
    color: #fff;
  }
}
</style>
