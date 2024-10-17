import { createApp } from 'vue'
import Loading from './loading'

const loadingDirective = {
  mounted(el, binding) {
    const app = createApp(Loading)
    const instance = app.mount(document.createElement('div'))

    el.instance = instance

    if (binding.value) {
      append(el)
    }
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el)
    }
  }
}

// 挂载实例
function append(el) {
  el.appendChild(el.instance.$el)
}
// 移出实例
function remove(el) {
  el.removeChild(el.instance.$el)
}

export default loadingDirective