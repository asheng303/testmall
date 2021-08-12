import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue

//安装插件
Vue.use(toast)
//安装懒加载插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

//解决300ms延迟
FastClick.attach(document.body)
new Vue({
  render: h => h(App),
  router,
  store,
  toast
}).$mount('#app')
