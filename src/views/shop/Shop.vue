<template>
  <div class="wrapper">
    <div class="search">
      <!-- <div class="search__left iconfont" @click="handleClick">&#xe610;</div> -->
      <router-link :to="{name: 'Home'}">
        <div class="search__left iconfont">&#xe610;</div>
      </router-link>
      <div class="search__right">
        <span class="search__right__iconfont font iconfont">&#xecb0;</span>
        <input class="search__right__input" placeholder="请输入商品搜索" />
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl" />
    <Content :shopName="item.name" />
    <Cart />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get } from "../../utils/request";
import ShopInfo from "../../components/shopInfo";
import Content from "./Content.vue";
import Cart from "./Cart.vue";

// 返回上层
// const useBackEffect = () => {
//   const router = useRouter();
//   const handleClick = () => {
//     router.back();
//   };
//   return { handleClick };
// };

// 获取shop接口信息
const useGetItemDataEffect = () => {
  const route = useRoute();
  const data = reactive({ item: {} });
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`);
    if (result?.errno === 0 && result?.data) {
      data.item = result.data;
    }
  };
  getItemData();
  return { data };
};

export default {
  name: "Shop",
  components: { ShopInfo, Content, Cart },
  setup() {
    // const { handleClick } = useBackEffect();
    const { data } = useGetItemDataEffect();
    const { item } = toRefs(data);
    // return { item, handleClick };
    return { item };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  box-sizing: border-box;
  padding: 0 0.18rem 0;
}
.search {
  display: flex;
  margin: 0.16rem 0 0.04rem 0;
  line-height: 0.32rem;
  &__left {
    width: 0.32rem;
    font-size: 0.2rem;
    color: #b6b6b6;
  }
  &__right {
    display: flex;
    flex: 1;
    // background: #f5f5f5;
    border-radius: 0.16rem;
    &__iconfont {
      width: 0.44rem;
      text-align: center;
      color: #b7b7b7;
    }
    &__input {
      display: block;
      width: 100%;
      padding-right: 0.2rem;
      outline: none;
      border: none;
      font-size: .14rem;
      color: #333333;
      &::placeholder {
        color: #333333;
      }
    }
  }
}
</style>