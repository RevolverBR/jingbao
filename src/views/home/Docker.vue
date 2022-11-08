<template>
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      :key="index"
      :class="{ docker__item: true, 'docker__item--active': index === currentIndex }"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon" />
        <div class="docker__title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Docker",
  props: ['currentIndex'],
  setup() {
    const dockerList = [
      { icon: "&#xe607;", text: "首页", to: { name: "Home" } },
      { icon: "&#xe600;", text: "购物车", to: { name: "Home" } },
      { icon: "&#xe61e;", text: "订单", to: { name: "OrderList" } },
      { icon: "&#xe6a4;", text: "我的", to: { name: "My" } },
    ];
    return { dockerList };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.docker {
  box-sizing: border-box;
  position: absolute;
  padding: 0 0.18rem;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  // height: .52rem;
  border-top: 0.01rem solid $content-bg-color;
  color: $content-font-color;
  &__item {
    flex: 1;
    text-align: center;
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.18rem;
    }
    &--active {
      a {
        color: #1fa4fc;
      }
    }
  }
  &__title {
    // 移动端最小12px
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>