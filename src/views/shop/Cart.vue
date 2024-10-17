<template>
  <div class="mask" v-if="showCart && cartComputed.total > 0" @click="handleShowCart" />
  <div class="cart">
    <div class="cartdetails" v-show="showCart && cartComputed.total > 0">
      <div class="cartdetails__top">
        <!-- <div class="cartdetails__top__icon iconfont" :style="allChecked ? ">&#xe616;</div> -->
        <div
          @click="selectcartall(shopId)"
          :class="{
          iconfont: true,
            'cartdetails__top__iconall': cartComputed.allChecked,
            'cartdetails__top__iconnone': !cartComputed.allChecked
          }"
        >
          &#xe616;
        </div>
        <div class="cartdetails__top__selectall">全选</div>
        <div class="cartdetails__top__clear" @click="clearCart(shopId)">
          清空购物车
        </div>
      </div>

      <template v-for="item in cartComputed.productList" :key="item._id">
        <div class="cartdetails__item">
          <div
            class="cartdetails__item__yesicon iconfont"
            v-if="item.check"
            @click="changeCheck(shopId, item._id)"
          >
            &#xe616;
          </div>
          <div
            class="cartdetails__item__noicon iconfont"
            v-if="!item.check"
            @click="changeCheck(shopId, item._id)"
          >
            &#xe616;
          </div>

          <img class="cartdetails__item__img" :src="item.imgUrl" alt="" />
          <div class="cartdetails__item__particulars">
            <h4 class="cartdetails__item__particulars__title">
              {{ item.name }}
            </h4>
            <p class="cartdetails__item__particulars__price">
              <span class="cartdetails__item__particulars__yen"
                >总计&yen;{{ item.price * item.count }}</span
              >
            </p>
          </div>
          <div class="cartdetails__item__number">
            <span
              class="cartdetails__item__number__reduce"
              @click="
                            () => {
                                toCart(shopId, item._id, item, -1);
                            }
                        "
              >-</span
            >
            {{ getCount(shopId, item._id) }}
            <span
              class="cartdetails__item__number__increase"
              @click="
                            () => {
                                toCart(shopId, item._id, item, 1);
                            }
                        "
              >+</span
            >
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon" @click="handleShowCart">
        <img
          class="check__icon__img"
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          alt=""
        />
        <div class="check__icon__tag">{{ cartComputed.total }}</div>
      </div>
      <div class="check__info">
        总计：
        <span class="check__info__price">&yen;{{ cartComputed.totalPrice }}</span>
      </div>
      <div class="check__btn">
        <router-link :to="`/ShopCart/${shopId}`">
          去结算
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useCartEffect, useCartCommonEffect } from './cartCommonEffect';

export default {
    name: "Cart",
    setup() {
        let showCart = ref(false)
        const store = useStore()

        const handleShowCart = () => {
            showCart.value = !showCart.value
        }

        const clearCart = (shopId) => {
            store.commit('clearCart', {
                shopId
            })
        }

        const { cartComputed, cartList, shopId, changeCheck, selectcartall, getCount, toCart } = useCartEffect();

        return {
          cartComputed, cartList, shopId, showCart, toCart, changeCheck, clearCart, selectcartall, handleShowCart, getCount
        };
    },
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin.scss";

a {
  text-decoration: none;
  color: #fff;
}

.mask {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba($color: #2a2a33, $alpha: 0.5);
  z-index: 10;
}

.cart {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    // height: 0.49rem;
    background-color: #fff;
    z-index: 20;
}

.cartdetails {
    overflow-y: scroll;
    flex: 1;
    background-color: #deeff1;
    &__top {
        display: flex;
        height: .52rem;
        border-bottom: .01rem solid #F1F1F1;
        align-items: center;
        &__iconall {
            width: .3rem;
            color: rgb(21, 150, 9);
            font-size: .2rem;
            margin-left: .16rem;
        }
        &__iconnone {
            width: .3rem;
            color: rgb(99, 148, 144);
            font-size: .2rem;
            margin-left: .16rem;
        }
        &__selectall {
            // flex: 1;
            width: 0.8rem;
            text-align: left;
            color: #333;
            font-size: .16rem;
        }
        &__clear {
            flex: 1;
            text-align: right;
            color: #333;
            font-size: .16rem;
            margin-right: .2rem;
            margin-left: 1.6rem;
        }
    }
    &__item {
        // position: relative;
        display: flex;
        padding: 0.12rem 0;
        margin: 0 0.16rem;
        border-bottom: 0.01rem solid #8df5f0;
        &__yesicon {
            position: relative;
            margin-top: .1rem;
            color: rgb(21, 150, 9);
            font-size: .2rem;
        }
        &__noicon {
            margin-top: .1rem;
            position: relative;
            color: rgb(99, 148, 144);
            font-size: .2rem;
        }
        &__img {
            width: 0.46rem;
            height: 0.46rem;
            margin: auto 0.16rem;
        }
        &__particulars {
            overflow: hidden;
            flex: 1;
            &__title {
                margin: 0;
                line-height: 0.2rem;
                font-size: 0.14rem;
                color: #333;
                @include ellipsis;
            }
            &__sales {
                margin: 0.06rem 0;
                font-size: 0.12rem;
                line-height: 0.16rem;
                color: #333;
            }
            &__price {
                margin: 0;
                line-height: 0.2rem;
                font-size: 0.14rem;
                color: #e93b3b;
            }
            &__yen {
                font-size: 0.12rem;
            }
            &__origin {
                margin-left: 0.06rem;
                line-height: 0.2rem;
                font-size: 0.12rem;
                color: #999;
                text-decoration: line-through;
            }
        }
        &__number {
            // position: flex;
            margin: auto .1rem ;
            &__reduce,
            &__increase {
                display: inline-block;
                width: 0.2rem;
                height: 0.2rem;
                line-height: 0.16rem;
                border-radius: 50%;
                font-size: 0.2rem;
                text-align: center;
            }
            &__reduce {
                border: 0.01rem solid #666;
                margin-right: 0.1rem;
            }
            &__increase {
                background-color: #0091ff;
                color: #fff;
                margin-left: 0.1rem;
            }
        }
    }
}

.check {
    display: flex;
    height: 0.49rem;
    line-height: 0.49rem;
    border-top: 0.01rem solid #f1f1f1;
    &__icon {
        position: relative;
        width: 0.84rem;
        &__img {
            display: block;
            margin: 0.12rem auto;
            width: 0.28rem;
            height: 0.26rem;
        }
        &__tag {
            position: absolute;
            left: 0.46rem;
            top: 0.06rem;
            min-width: 0.2rem;
            height: 0.2rem;
            line-height: 0.2rem;
            background-color: #e03535;
            border-radius: 0.1rem;
            font-size: 0.12rem;
            text-align: center;
            transform: scale(0.6);
            transform-origin: left center;
            color: #fff;
        }
    }
    &__info {
        flex: 1;
        font-size: 0.12rem;
        color: #333;
        &__price {
            color: #e93b3b;
            font-size: 0.18rem;
            line-height: 0.49rem;
        }
    }
    &__btn {
        width: 0.98rem;
        color: #fff;
        font-size: 0.14rem;
        background-color: #4fb0f9;
        text-align: center;
    }
}
</style>
