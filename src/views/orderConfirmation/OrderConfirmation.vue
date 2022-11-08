<template>
  <OrderConfirmationTop />
  <ProductsList />
  <Order />
</template>

<script>
import OrderConfirmationTop from "./Top.vue";
import ProductsList from "./ProductsList.vue";
import Order from "./Order.vue";

export default {
  name: "OrderConfirmation",
  components: {
    OrderConfirmationTop,
    ProductsList,
    Order,
  },
};
</script>

<style lang="scss" scoped>
</style>