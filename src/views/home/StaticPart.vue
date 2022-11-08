<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe60e;</span>
    北京理工大学国防科技园2号楼10层 北京理工大学国防科技园2号楼10层
    北京理工大学国防科技园2号楼10层
    <span class="iconfont position__notice">&#xe625;</span>
  </div>
  <div class="search">
    <span class="iconfont">&#xecb0;</span>
    <span class="search__text">山姆会员商店优惠商品</span>
  </div>
  <div class="banner">
    <img
      class="banner__img"
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
      alt="banner-img"
    />
  </div>
  <div class="icons">
    <div
      class="icons__item"
      v-for="(item, index) in staticPartList"
      :key="index"
    >
      <img
        :src="`http://www.dell-lee.com/imgs/vue3/${item.spImgUrl}.png`"
        alt="spText"
        class="icons__item__img"
      />
      <p class="icons__item__text">{{ item.spText }}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: "StaticPart",
  setup() {
    const staticPartList = [
      { spImgUrl: "超市", spText: "超市便利" },
      { spImgUrl: "菜市场", spText: "菜市场" },
      { spImgUrl: "水果店", spText: "水果店" },
      { spImgUrl: "鲜花", spText: "鲜花绿植" },
      { spImgUrl: "医药健康", spText: "医药健康" },
      { spImgUrl: "家居", spText: "家居时尚" },
      { spImgUrl: "蛋糕", spText: "烘焙蛋糕" },
      { spImgUrl: "签到", spText: "签到" },
      { spImgUrl: "大牌免运", spText: "大牌免运" },
      { spImgUrl: "红包", spText: "红包套餐" },
    ];
    return { staticPartList };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  @include ellipsis;
  color: $content-font-color;
  //增加权重
  .position__icon {
    position: relative;
    top: 0.01rem;
    margin-right: 0.08rem;
    font-size: 0.2rem;
  }
  .position__notice {
    position: absolute;
    right: 0;
    top: 0.17rem;
    font-size: 0.2rem;
  }
}
.search {
  margin-bottom: 0.12rem;
  height: 0.32rem;
  background-color: #f5f5f5;
  color: #b7b7b7;
  border-radius: 0.16rem;
  .iconfont {
    position: relative;
    top: 0.02rem;
    padding: 0 0.1rem 0 0.16rem;
    display: inline-block;
    font-size: 0.2rem;
  }
  &__text {
    display: inline-block;
    font-size: 0.14rem;
  }
}
.banner {
  // 给图片占位，避免下面内容抖动
  height: 0;
  overflow: hidden;
  // 图片高宽比
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;
  &__item {
    width: 20%;
    &__img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &__text {
      margin: 0.06rem 0 0.16rem 0;
      text-align: center;
      color: $content-font-color;
    }
  }
}
.gap {
  margin: 0 -0.18rem;
  height: 0.1rem;
  background-color: $content-bg-color;
}
</style>
