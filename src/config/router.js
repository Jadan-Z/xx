import Vue from 'vue'
import Router from 'vue-router'

// 要告诉 vue 使用 vueRouter
Vue.use(Router)

export default new Router({
  mode: 'history', // 去掉路由地址的#
  routes: [
    // 重定向
    { path: '/', redirect: '/login'},

    // Login
    { path: '/login', component: () => import('../view/Login.vue')},

    // Register
    { path: '/register', component: () => import('../view/student/Register.vue') },

    // student
    { path: '/student', component: () => import('../view/student/Stu.vue')},

    // teacher
    { path: '/teacher', component: () => import('../view/teacher/Teacher.vue')},

    // test
    { path: '/test', component: () => import('../view/test/test.vue')}

  ],

})