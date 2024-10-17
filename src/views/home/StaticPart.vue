<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe7f1;</span>
    北京理工大学
    <span class="iconfont position__notice">&#xe887;</span>
  </div>

  <!-- 搜索栏 -->
  <div class="search">
    <span @click="handleSearch(searchmessage)" class="iconfont">&#xe82e;</span>
    <input
      class="search__text"
      placeholder="三木会员商店"
      v-model="searchmessage"
    />
    <span @click="clearInput" class="iconfont">&#xe64c;</span>
  </div>

  <!-- banner -->
  <div class="banner">
    <img src="http://localhost/myjingdong/iconlist/banner.jpg" alt="banner" />
  </div>

  <!-- icon -->
  <div class="icons">
    <div v-for="item in iconsList" :key="item.id" class="icons__item">
      <img
        v-lazy="`http://localhost/myjingdong/iconlist/${item.spImgUrl}.png`"
        alt=""
        class="icons_item__img"
      />
      <p class="icons__item__desc">{{ item.spText }}</p>
    </div>
  </div>

  <!-- little blank -->
  <div class="gap"></div>
</template>

<script>
import { iconsList } from './homedata';

const handleSearch = (searchmessage) => {
    console.log(searchmessage)
}

export default {
    name: "StaticPart",
    data() {
        return {
            searchmessage: ''
        }
    },
    methods: {
        clearInput() {
            this.searchmessage = ''
        }
    },
    setup() {
        return {
            iconsList,
            handleSearch,
        };
    },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixin.scss";
.position {
    position: relative;
    padding: 0.16rem 0.24rem 0.16rem 0;
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: #333;
    // 地址文本溢出隐藏
    @include ellipsis;
    &__icon {
        position: relative;
        top: 0.01rem;
        font-size: 0.2rem;
    }
    &__notice {
        position: absolute;
        top: 0.17rem;
        right: 0;
        font-size: 0.2rem;
    }
}

.search {
    margin-bottom: 0.12rem;
    line-height: 0.32rem;
    background: #f5f5f5;
    color: #b7b7b7;
    border-radius: 0.16rem;
    font-size: 0.14rem;
    .iconfont {
        position: relative;
        top: 0.02rem;
        display: inline-block;
        padding: 0 0.08rem 0 0.16rem;
        font-size: 0.16rem;
    }
    &__text {
        width: 2.85rem;
        height: 0.32rem;
        background: transparent;
        border: none;
        // opacity: .5;
        outline: none;
    }
}

.banner {
    // 加载慢的情况下给图片占位置
    height: 0;
    overflow: hidden;
    padding-bottom: 25.4%;
    img {
        width: 100%;
    }
}

.icons {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.16rem;
    &__item {
        width: 20%;
        img {
            display: block;
            width: 0.4rem;
            height: 0.4rem;
            margin: 0 auto;
        }
        &__desc {
            margin: 0.06rem 0 0.16rem 0;
            text-align: center;
            color: $content-fontcolor;
        }
    }
}

.gap {
    height: 0.1rem;
    background-color: #f1f1f1;
    margin: 0 -0.18rem;
}
</style>
