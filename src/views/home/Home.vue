<template>
    <!-- 主体内容 -->
    <div class="wrapper">
        <!-- 地址栏 -->
        <StaticPart />

        <!-- 附近店铺 -->
        <Nearby />
    </div>

    <!-- 页脚 -->
    <Docker />
</template>

<script>
import StaticPart from "./StaticPart.vue";
import Nearby from "./Nearby.vue";
import Docker from "./Docker.vue";

export default {
    name: "Home",
    components: {
        StaticPart,
        Nearby,
        Docker,
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
    // 让页面滚动
    overflow-y: auto;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.5rem;
    top: 0;
    // background-color: blue;
    padding: 0 0.18rem 0.2rem 0.18rem;
}
</style>
