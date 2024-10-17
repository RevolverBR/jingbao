<template>
  <div class="mask" />
  <div class="order">
    <div class="title">
      确认离开收银台
    </div>
    <div class="message">
      请尽快完成支付，否则将被取消
    </div>
    <div class="btn">
      <div class="btn__confirm">确认支付</div>
      <div class="btn__cancel">取消订单</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Order',
  props: ['showOrder'],
  setup() {

  }
}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba($color: #2a2a33, $alpha: 0.5);
  z-index: 10;
}
.order {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 2.6rem;
  height: 1.8rem;
  transform: translate(-1.3rem, -1rem);
  background-color: #fff;
  z-index: 100;
  border-radius: .12rem;
}
.title {
  margin-top: .4rem;
  line-height: .24rem;
  text-align: center;
  font-size: .2rem;
  color: #2690d6;
}
.message {
  line-height: .2rem;
  text-align: center;
  margin: .2rem 0;
}
.btn {
  margin: 0.24rem 0.4rem;
  width: 1.8rem;
  height: .4rem;
  line-height: .4rem;
  justify-content: space-between;
  display: flex;
  font-size: .16rem;
  text-align: center;
  &__confirm {
    flex: 1;
    border-radius: .12rem;
    background-color: #fff;
    margin-right: .1rem;
    border: .01rem solid #a2a2c9;
  }
  &__cancel {
    flex: 1;
    margin-left: .1rem;
    border-radius: .12rem;
    background-color: #4fb0f9;
    border: .01rem solid #a2a2c9;
    color: #fff;
  }
}
</style>
