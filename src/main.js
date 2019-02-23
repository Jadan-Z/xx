import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import VueWechatTitle from 'vue-wechat-title';

import router from './config/router'
import store from './config/store'
import axios from './config/axios'

Vue.prototype.axios = axios;


Vue.use(ElementUI);
// Vue.use(VueWechatTitle)

Vue.config.productionTip = false
Vue.axios = Vue.prototype.axios = axios

new Vue({
  router, // 注入到根实例中
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
