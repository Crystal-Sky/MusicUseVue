// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import loading from './assets/loading.gif'
import store from './store/index'

Vue.use(VueLazyLoad, {
  loading
})
Vue.use(MintUI)
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
