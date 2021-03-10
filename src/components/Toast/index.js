import vue from 'vue'
import toastComponent from './toast.vue'

const ToastConstructor = vue.extend(toastComponent)

function showToast ({ text, type, duration = 2000 }) {
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    data () {
      return {
        isShow: false, // 是否显示
        text: text, // 文本内容
        type: type // 类型
      }
    }
  })
  // 添加节点
  document.body.appendChild(toastDom.$el)
  setTimeout(() => {
    toastDom.isShow = true
  }, 100)
  // 过渡时间
  setTimeout(() => {
    toastDom.isShow = false
  }, duration)

}
// 全局注册
function registryToast () {
  vue.prototype.$toast = showToast
}

export default registryToast
