import { createStore } from 'vuex'

export default createStore({
  state: {
    // 购物车
    cartList: {
      // shopId: {
      //   shopName: '沃尔玛',
      //   productList: {
      //     productId: {
      //       _id: 1,
      //       name: '',
      //       count: 2,
      //       check: true
      //     }
      //   }
      // }
    }
    // cartList: [
    //   {
    //     shopid: '1',
    //     shopname: '沃尔玛',
    //     productlist: [
    //       {
    //         productid: '1',
    //         productname: '',
    //         count: 1
    //         check: true
    //       }
    //     ]
    //   }
    // ]
  },
  mutations: {
    changeItemToCart(state, payload) {
      const { shopId, productId, productInfo, num } = payload

      // 选中店铺
      let shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }

      // 选中商品
      let product = shopInfo.productList[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }

      // 商品数量增减
      product.count += num
      // 商品增减时都将商品的选中状态置为true
      if (product.count > 0) product.check = true
      if (product.count < 0) product.count = 0

      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
    },
    // 改变购物车中商品的选中状态，接受两个参数定位商品
    changeProductChecked(state, payload) {
      const { shopId, productId } = payload
      // 直接取反，商品加减时都会为true
      state.cartList[shopId].productList[productId].check =
        !state.cartList[shopId].productList[productId].check
    },
    // 清空购物车
    clearCart(state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
    },
    // 全选购物车
    selectCartAll(state, payload) {
      const { shopId } = payload
      const productList = state.cartList[shopId].productList
      if (productList) {
        for (let i in productList) {
          productList[i].check = true
        }
      }
    },
    setShopName(state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      shopInfo.shopName = shopName
      // 下面会多创建一个cartList.shopId
      // state.cartList.shopId = shopInfo
      state.cartList[shopId] = shopInfo
    }
  },
  actions: {},
  modules: {}
})
