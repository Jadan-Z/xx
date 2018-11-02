import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from './config/router'
import store from './config/store'
import axios from './config/axios'

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router, // 注入到根实例中
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
