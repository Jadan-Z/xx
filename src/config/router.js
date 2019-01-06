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
    { path: '/login', component: () => import('../view/Login.vue'), meta:{title: '注册'}},

    // Register
    { path: '/register', component: () => import('../view/student/Register.vue') },

    // student
    {
      path: '/student',
      component: () => import('../view/student/Student.vue'),
      children: [
          {
              path: 'personInfo',
              component: () => import('../view/student/PersonInformation.vue')
          },
          {
              path: 'setting',
              component: () => import('../view/compoents/student-setting.vue')
          }

      ]
    },

    // teacher
    {
      path: '/teacher',
      component: () => import('../view/teacher/TeacherTest.vue'),
      children: [
          {
              path: 'setting',
              component: () => import('../view/compoents/teacher-setting.vue')
          }
      ]
    },

    // headmaster
    {
      path: '/headmaster',
      component: () => import('../view/headmaster/HeadmasterTest.vue'),
      children: [
          {
            path: 'info',
            component: () => import('../view/compoents/info.vue')
          },
          {
              path: 'setting',
              component: () => import('../view/compoents/master-settings.vue')
          },
      ]
    },

    // test
    { path: '/test', component: () => import('../view/user/UserIndex.vue')},

    // buju
    { path: '/bu', component: () => import('../view/test/message.vue')},

    // header
    { path: '/header', component: () => import('../view/compoents/header.vue')},

    // tab
      { path: '/tabs', component: () => import('../view/test/myTab.vue')},

      // test
      { path: '/test1', component: () => import('../view/test/test.vue')},

      // master-settings
      { path: '/headmaster/master-settings', component: () => import('../view/compoents/master-settings.vue')}
      // { path: '/xx', component: component1 }

  ],
})