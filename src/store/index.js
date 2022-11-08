import { createStore } from 'vuex'

const setLocalStorage = (state) => {
  const { cartList } = state;
  const cartListString = JSON.stringify(cartList);
  localStorage.cartList = cartListString;
}

const getLocalStorage = () => {
  if (localStorage.cartList) {
    return JSON.parse(localStorage.cartList);
  } else {
    return {};
  }
}

export default createStore({
  state: {
    cartList: getLocalStorage()
    // cartList: {}
    // {
    //   shopId: {
    //     shopName: '沃尔玛',
    //     productList: {
    //       productId: {
    //         _id: '1',
    //         name: 'ss',
    //         imgUrl: '',
    //         count: 1
    //       }
    //     }
    //   }
    // }
  },
  mutations: {
    changeCart(state, payload) {
      const { shopId, productId, productInfo } = payload;
      let shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      };
      let product = shopInfo.productList[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      product.count += payload.num;
      if (product.count > 0) { product.check = true };
      if (product.count < 0) product.count = 0;
      if (product.count > 99) product.count = 99;
      shopInfo.productList[productId] = product;
      state.cartList[shopId] = shopInfo;
      setLocalStorage(state);
    },
    changeCartItemCheck(state, payload) {
      const { shopId, productId } = payload;
      const product = state.cartList[shopId].productList[productId];
      product.check = !product.check;
      // setLocalStorage(state);
    },
    changeShopName(state, payload) {
      const { shopId, shopName } = payload;
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      shopInfo.shopName = shopName;
      state.cartList[shopId] = shopInfo;
      setLocalStorage(state);
    },
    cartClear(state, payload) {
      const { shopId } = payload;
      state.cartList[shopId].productList = {};
      setLocalStorage(state);
    },
    allCheckChange(state, payload) {
      const { shopId } = payload;
      const products = state.cartList[shopId].productList;
      if (products) {
        for (let key in products) {
          const product = products[key]
          product.check = true;
        }
      }
      setLocalStorage(state);
    },
    // 清空购物车
    clearCart(state, shopId) {
      state.cartList[shopId].productList = {}
    }
  },
  actions: {
  },
  modules: {
  }
})
