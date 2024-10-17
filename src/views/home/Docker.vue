<template>
    <div class="docker">
        <!-- <div
            v-for="(item, index) in dockerList"
            :key="item.icon"
            :class="{ 'docker__item': true, 'docker__item--active': index === 0 }"
        > -->
        <router-link
            v-for="item in dockerList"
            :key="item.icon"
            class="docker__item"
            :to="`/${item.url}`"
        >
            <div class="iconfont" v-html="item.icon" />
            <div class="docker__title">{{item.text}}</div>
        </router-link>
    </div>
</template>

<script>
import { dockerList } from './homedata';
// :class="{ 'docker__item': true, 'docker__item--active': index === 0 }"
export default {
    name: "Docker",
    setup() {

        return { dockerList };
    }
};
</script>

<style lang="scss" scoped>
.docker {
    display: flex;
    position: absolute;
    box-sizing: border-box;
    padding: 0 0.18rem;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 0.49rem;
    border-top: 0.01rem solid #f1f1f1;
    a {
        text-decoration: none;
    }
    // background-color: green;
    &__item {
        flex: 1;
        text-align: center;
        color: #c22222;
        .iconfont {
            margin: 0.07rem;
            font-size: 0.18rem;
        }
        // &--active {
        //     color: #1fa4fc;
        // }
        &.router-link-active {
            color: #10c8e0;
        }
    }
    &__title {
        font-size: 0.2rem;
        transform: scale(0.5, 0.5);
        transform-origin: center top;
    }
}
</style>
