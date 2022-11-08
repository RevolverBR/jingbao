<template>
  <div class="wrapper">
    <div class="iconfont">&#xe607;</div>
    &#xe607;
  </div>
  <Docker :currentIndex="3" />
</template>

<script>
import Docker from "../home/Docker.vue";

export default {
  name: "My",
  components: { Docker },
  setup() {

  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  // 让页面能够滚动，不让底部跟着跑
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  background-color: #eee;
}
</style>