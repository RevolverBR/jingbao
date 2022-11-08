import { useStore } from "vuex";
import { computed } from "vue";
import { useRoute } from "vue-router";

//购物车
export const useChangeCartEffet = () => {
  const store = useStore();
  const route = useRoute();
  const shopId = route.params.id;
  const cartList = store.state.cartList;

  //改变购物车数据本地全局变量
  const changeCart = (shopId, productId, productInfo, num) => {
    store.commit("changeCart", {
      shopId,
      productId,
      productInfo,
      num
    });
  };

  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {};
    const notEmptyProductList = {};
    for(let i in productList){
      const product = productList[i];
      if(product.count > 0) {
        notEmptyProductList[i] = product;
      }
    }
    return notEmptyProductList;
  });

  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || '';
    return shopName;
  });

  //计算购物车物品数量
  const calcutions = computed(() => {
    const productList = cartList[shopId]?.productList;
    let result = { count: 0, price: 0, allChecked: true }

    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        result.count += product.count;
        if (product.check) {
          result.price += product.count * product.price;
        }
        if (product.count > 0 && !product.check) {
          result.allChecked = false;
        }
      }
    }
    result.price = result.price.toFixed(2);
    return result;
  });
  return { cartList, changeCart, productList, shopName, calcutions };
};

//导出productlist
// export const useChangeCartProductListEffet = () => {
  
//   return { productList, shopName };
// }