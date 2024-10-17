import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/home/Home.vue'
// import Login from '../views/login/Login.vue'
// import Register from '../views/register/Register.vue'
// import Shop from '../views/shop/Shop.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "Home" */ '../views/home/Home.vue')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () =>
      import(/* webpackChunkName: "Shop" */ '../views/shop/Shop.vue')
  },
  {
    path: '/my',
    name: 'My',
    component: () =>
      import(/* webpackChunkName: "Home" */ '../views/my/MyPlace.vue')
  },
  {
    path: '/shopCart/:id',
    name: 'ShopCart',
    component: () =>
      import(/* webpackChunkName: "Home" */ '../views/shopCart/ShopCartMain.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () =>
      import(/* webpackChunkName: "Home" */ '../views/order/OrderList.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../views/login/Login.vue'),
    beforeEnter(to, from, next) {
      // const { token } = localStorage;
      // token ? next({ name: 'Home' }) : next();
      next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(
        /* webpackChunkName: "Register" */ '../views/register/Register.vue'
      ),
    beforeEnter(to, from, next) {
      const { token } = localStorage
      token ? next({ name: 'Home' }) : next()
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 登录验证
router.beforeEach((to, from, next) => {
  const { token } = localStorage
  !token && to.name !== 'Login' && to.name !== 'Register'
    ? next({ name: 'Login' })
    : next()
})

export default router
