import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export const useCartEffect = () => {
  const store = useStore()
  const route = useRoute()
  const cartList = store.state.cartList
  const shopId = route.params.id

  // 购物车相关计算属性
  const cartComputed = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    // const contentList = cartList[shopId]?.productList || {}

    // 全选状态
    let allChecked = true
    // 购物车商品数量
    let total = 0
    // 商品总价
    let totalPrice = 0
    let price = 0

    if (productList) {
      for (let i in productList) {
        const product = productList[i]
        total += product.count
        if (product.check) {
          price += product.price * product.count
          totalPrice = price.toFixed(2)
        }
        if (product.count > 0 && !product.check) {
          allChecked = false
        }
      }
    }

    return { total, totalPrice, productList, allChecked }
  })

  // 全选事件
  const selectcartall = shopId => {
    store.commit('selectCartAll', {
      shopId
    })
  }

  // 根据商店和商品id改变商品前的勾选状态
  const changeCheck = (shopId, productId) => {
    store.commit('changeProductChecked', {
      shopId,
      productId
    })
  }

  // +-中间显示的商品数量
  const getCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }

  //  加减商品
  const toCart = (shopId, productId, productInfo, num) => {
    store.commit('changeItemToCart', {
      shopId,
      productId,
      productInfo,
      num
    })
  }

  return {
    cartComputed,
    cartList,
    shopId,
    changeCheck,
    selectcartall,
    getCount,
    toCart
  }
}
