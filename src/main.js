import Vue from 'vue'
import App from './App.vue'

import router from './config/router'
import store from './config/store'
import axios from './config/axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
