<template>
  <div class="content">
    <div class="content__category">
      <div
        :class="{
          content__category__item: true,
          'content__category__item--active': currentTab === item.tab
        }"
        v-for="item in category"
        :key="item.id"
        @click="handleCategoryClick(item.tab)"
      >
        {{ item.name }}
      </div>
    </div>

    <div class="content__products">
      <div
        class="content__products__item"
        v-for="item in contentList"
        :key="item._id"
      >
        <img class="content__products__item__img" :src="item.imgUrl" alt="" />

        <div class="content__products__item__particulars">
          <h4 class="content__products__item__particulars__title">
            {{ item.name }}
          </h4>
          <p class="content__products__item__particulars__sales">
            月售{{ item.sales }}
          </p>
          <p class="content__products__item__particulars__price">
            <span class="content__products__item__particulars__yen"
              >售价&yen;{{ item.price }}</span
            >
            <span class="content__products__item__particulars__origin"
              >原价&yen;{{ item.oldPrice }}</span
            >
          </p>
        </div>

        <div class="content__products__item__number">
          <span
            class="content__products__item__number__reduce"
            @click="
              () => {
                setCart(shopId, item._id, item, -1, shopName)
              }
            "
            >-</span
          >
          {{ getCount(shopId, item._id) }}
          <span
            class="content__products__item__number__increase"
            @click="
              () => {
                setCart(shopId, item._id, item, 1, shopName)
              }
            "
            >+</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, toRef } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { getProductWithId } from '../../api'
import { useCartEffect } from './cartCommonEffect'
import { useStore } from 'vuex'

const category = [
  { id: 1, name: '全部商品', tab: 'all' },
  { id: 2, name: '秒杀', tab: 'seckill' },
  { id: 3, name: '新鲜水果', tab: 'fruit' }
]

// 导航跳转
const useTabEffect = () => {
  const currentTab = ref(category[0].tab)
  // 每次跳转后改变currentTab的值，让active可以变动
  const handleCategoryClick = tab => {
    currentTab.value = tab
  }
  return { handleCategoryClick, currentTab }
}

// 获取content内容
const useContentListEffect = (currentTab) => {
  const data = reactive({ contentList: [] })

  const route = useRoute()
  const shopId = route.params.id

  const getContentData = async () => {
    const result = await getProductWithId(`/product/${shopId}`, {tab: currentTab.value})

    if (result.code === 0 && result.data) {
      data.contentList = result.data
    }
  }

  // 监听导航跳转改变展示内容
  watchEffect(() => {
    getContentData()
  })

  // const { contentList } = toRefs(data)
  const { contentList } = toRefs(data)

  return { contentList, shopId }
}

export default {
  name: 'Content',
  data() {
    return {
      loading: false
    }
  },
  props: ["shopName"],
  mounted () {
    this.loading = true
  },
  setup() {
    const store = useStore()
    const { handleCategoryClick, currentTab } = useTabEffect()
    const { contentList, shopId } = useContentListEffect(currentTab)

    const { toCart, cartList, getCount } = useCartEffect()
    const setShopName = (shopId, shopName) => {
      store.commit('setShopName', {shopId, shopName})
    }
    const setCart = (shopId, productId, item, num, shopName) => {
      toCart(shopId, productId, item, num),
      setShopName(shopId, shopName)
    }

    return {
      category,
      handleCategoryClick,
      currentTab,
      contentList,
      shopId,
      setCart,
      cartList,
      getCount
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';

.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.6rem;
  bottom: 0.5rem;
  &__category {
    overflow-y: scroll;
    width: 0.76rem;
    height: 100%;
    background-color: #f5f5f5;
    &__item {
      line-height: 0.4rem;
      // padding: .05rem 0;
      font-size: 0.14rem;
      text-align: center;
      color: #333;
      &--active {
        background-color: rgba($color: #bab9cc, $alpha: 1);
      }
    }
  }
  &__products {
    overflow-y: scroll;
    flex: 1;
    // background-color: #7d87e4;
    &__item {
      position: relative;
      display: flex;
      padding: 0.12rem 0;
      margin: 0 0.16rem;
      border-bottom: 0.01rem solid #f1f1f1;
      &__img {
        width: 0.68rem;
        height: 0.68rem;
        margin-right: 0.16rem;
      }
      &__particulars {
        overflow: hidden;
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
        position: absolute;
        bottom: 0.12rem;
        right: 0rem;
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
}
</style>
