<template>
  <div class="order">
    <div class="order__trulypay">
      <div class="order__trulypay__text">实付金额</div>
      <div class="order__trulypay__num">
        <b>¥{{ calcutions.price }}</b>
      </div>
    </div>
    <div class="order__btn" @click="() => showMaskFun(true)">提交订单</div>
  </div>
  <div class="mask" v-if="showMask" @click="() => showMaskFun(false)">
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">确认离开收银台？</h3>
      <p class="mask__content__dsec">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--cancel"
          @click="() => handleMakeSureOrder(true)"
        >
          取消订单
        </div>
        <div
          class="mask__content__btn mask__content__btn--makesure"
          @click="() => handleMakeSureOrder(false)"
        >
          确认订单
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useChangeCartEffet } from "../shop/commonCartEffect";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { post } from "../../utils/request";

//提交订单页面变化
const useShowMaskEffect = () => {
  const showMask = ref(false);
  const showMaskFun = (status) => {
    showMask.value = status;
  };
  return { showMask, showMaskFun };
};

//提交订单交互
const useHandleMakeSureOrderEffect = () => {
  const route = useRoute();
  const router = useRouter();
  const store = useStore();
  const shopId = parseInt(route.params.id, 10);
  const { shopName, productList } = useChangeCartEffet();

  const handleMakeSureOrder = async (isCanceled) => {
    const products = [];
    for (let i in productList.value) {
      const product = productList.value[i];
      products.push({ id: parseInt(product._id, 10), num: product.count });
    }
    try {
      const result = await post("/api/order", {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products: {},
      });
      if (result?.errno === 0) {
        store.commit("clearCart", shopId);
        router.push({ name: "Home" });
      }
    } catch (e) {}
  };
  return { handleMakeSureOrder };
};

export default {
  name: "Order",
  setup() {
    const { calcutions } = useChangeCartEffet();
    const { handleMakeSureOrder } = useHandleMakeSureOrderEffect();
    const { showMask, showMaskFun } = useShowMaskEffect();

    return {
      calcutions,
      handleMakeSureOrder,
      showMask,
      showMaskFun,
    };
  },
};
</script>

<style lang="scss" scoped>
//页脚
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 0.49rem;
  line-height: 0.49rem;
  &__trulypay {
    width: 100%;
    color: #333333;
    background: #ffffff;
    display: flex;
    &__text {
      font-size: 0.14rem;
      text-indent: 0.24rem;
    }
    &__num {
      font-size: 0.16rem;
      text-indent: 0.04rem;
    }
  }
  &__btn {
    width: 0.98rem;
    background-color: #4fb0f9;
    font-size: 0.14rem;
    color: #ffffff;
    text-align: center;
  }
}
//
.mask {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background: #fff;
    border-radius: 0.04rem;
    &__title {
      margin-top: 0.24rem;
      line-height: 0.25rem;
      font-size: 0.18rem;
      color: #333333;
      text-align: center;
    }
    &__dsec {
      margin-top: 0.08rem;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #666666;
      text-align: center;
    }
    &__btns {
      margin: 0.24rem 0.55rem;
      display: flex;
      justify-content: space-between;
    }
    &__btn {
      width: 0.8rem;
      height: 0.32rem;
      line-height: 0.32rem;
      border: 0.01rem solid #4fb0f9;
      border-radius: 0.16rem;
      font-size: 0.14rem;
      text-align: center;
      &--cancel {
        color: #0091ff;
        background: #ffffff;
      }
      &--makesure {
        color: #ffffff;
        background: #4fb0f9;
      }
    }
  }
}
</style>