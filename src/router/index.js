import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import(/* webpackChunkName: "orderList" */ '../views/my/My')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop')
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import(/* webpackChunkName: "orderConfirmation" */ '../views/orderConfirmation/OrderConfirmation')
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "orderList" */ '../views/orderList/OrderList')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login'),
    // 已经登录状态不再继续访问登录页面
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage;
      isLogin ? next({ name: 'Home' }) : next();
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register/Register'),
    // 已经登录状态不再继续访问注册页面
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage;
      isLogin ? next({ name: 'Home' }) : next();
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 未登录前先登录才能访问其他页面
router.beforeEach(
  (to, from, next) => {
    const isLogin = localStorage.isLogin;
    (!isLogin && to.name !== 'Login' && to.name !== 'Register') ? next({ name: 'Login' }) : next();
  }
)

export default router
