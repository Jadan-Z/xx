import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    
    //user
    { path: '/', component: () => import('../view/user/UserIndex.vue')},
    
    //admin
    { path: '/admin', component: () => import('../view/admin/Login.vue')}
    
  ]
})