<template>
  <div class="top">
    <div class="top__header">
      <router-link :to="{ name: 'Shop' }">
        <div class="top__header__back iconfont">&#xe712;</div>
      </router-link>
      <div class="top__header__text">确认订单</div>
    </div>
    <div class="top__receiver">
      <div class="top__receiver__title">收货地址</div>
      <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
      <div class="top__receiver__info">
        <div class="top__receiver__recname">某先生</div>
        <div class="top__receiver__rectel">12345678944</div>
      </div>
      <div class="top__receiver__icon iconfont">&#xe712;</div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'OrderConfirmationTop'
}
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
//确认订单收货地址
.top {
//   position: absolute;
  box-sizing: border-box;
  overflow: hidden;
//   left: 0;
//   right: 0;
//   top: 0;
//   height: 1.96rem;
  margin-bottom: 0.16rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  background-repeat: no-repeat;
  &__header {
    width: 100%;
    padding: 0.3rem 0 0.22rem 0.18rem;
    position: relative;
    font-size: 0.16rem;
    color: #ffffff;
    &__back {
      width: 0.12rem;
      height: 0.22rem;
      font-size: 0.22rem;
    }
    &__text {
      position: absolute;
      top: 0.32rem;
      left: 50%;
      margin-left: -0.41rem;
    }
  }
  &__receiver {
    margin: 0 0.18rem 0;
    padding: 0.16rem;
    position: relative;
    background: #ffffff;
    border-radius: 0.04rem;
    &__title {
      font-size: .16rem;
      color: #333333;
      margin-bottom: 0.14rem;
    }
    &__list {
      overflow-y: scroll;
    }
    &__address {
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #333333;
      padding-bottom: 0.06rem;
      @include ellipsis;
    }
    &__info {
      display: flex;
      line-height: 0.17rem;
      font-size: 0.12rem;
      color: #666666;
    }
    &__recname {
      margin-right: 0.06rem;
    }
    &__icon {
      position: absolute;
      top: 50%;
      margin-top: -0.08rem;
      right: 0.08rem;
      transform: rotate(180deg);
      width: 0.08rem;
      height: 0.16rem;
      font-size: 0.25rem;
      color: #666666;
    }
  }
}
</style>