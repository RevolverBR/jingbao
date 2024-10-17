<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__left iconfont" @click="handleBackHome">&#xe697;</div>
      <div class="search__right">
        <div class="search__right__icon iconfont">&#xe82e;</div>
        <input class="search__right__input" placeholder="请输入商品名称" />
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl" />
    <Content :shopName="item.name" />
    <Cart />
  </div>
</template>

<script>
// import { reactive, toRefs, computed } from "@vue/reactivity";
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ShopInfo from '../../components/ShopInfo.vue'
import Content from '../shop/Content.vue'
import { getHotShop } from '../../api'
import Cart from './Cart.vue'

// 商店详情数据处理
const useShopDataEffect = () => {
  const route = useRoute()

  const data = reactive({ item: {} })

  const getShopData = async () => {
    const result = await getHotShop(`/store/${route.params.id}`)
    if (result.code === 0 && result.data) {
      data.item = result.data[0]
    }
    return { result, data }
  }

  const { item } = toRefs(data)
  return { item, getShopData }
}

// 返回按钮
const useBackHomeEffect = () => {
  const router = useRouter()

  const handleBackHome = () => {
    router.push('/')
  }

  return { handleBackHome }
}

export default {
  components: { ShopInfo, Content, Cart },
  setup() {
    const { item, getShopData } = useShopDataEffect()
    const { handleBackHome } = useBackHomeEffect()

    getShopData()

    return { item, handleBackHome }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0 0.18rem;
  // margin: 0 .18rem;
}

.search {
  margin: 0.2rem 0 0.04rem 0;
  height: 0.32rem;
  display: flex;
  &__left {
    width: 0.3rem;
    height: 0.32rem;
    font-size: 0.2rem;
    padding: 0.05rem 0 0 0;
  }
  &__right {
    display: flex;
    flex: 1;
    background-color: red;
    background: #f5f5f5;
    border-radius: 0.16rem;
    &__icon {
      width: 0.44rem;
      height: 0.32rem;
      margin: 0.08rem 0 0 0;
    }
    &__input {
      width: 100%;
      padding-right: 0.2rem;
      border: none;
      outline: none;
      background: none;
      height: 0.32rem;
    }
  }
}
</style>
