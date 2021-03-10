import Vue from 'vue';
import less from 'less';
import App from './App.vue';
import router from './router';
import store from './store';
import Toast from "@/components/Toast"
import '@/assets/iconfont/iconfont.css';
Vue.use(less);
Vue.use(Toast)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
