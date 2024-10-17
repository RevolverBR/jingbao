import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lazyPlugin from 'vue3-lazy'
// import { DatePicker } from 'ant-design-vue'
// import "ant-design-vue/dist/antd.css"

import 'normalize.css'
import './style/index.scss'
import loadingDirective from './components/base/loading/directive'

createApp(App).use(store).use(router).use(lazyPlugin, {
  loading: require('@/assets/images/default.png')
}).directive('loading', loadingDirective).mount('#app')
