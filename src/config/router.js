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
              path: 'info',
              component: () => import('../view/student/PersonInformation.vue')
          },
          {
              path: 'appointment',
              component: () => import('../view/student/AppointmentCourse.vue')
          },
          {
              path: 'reservation',
              component: () => import('../view/student/MyReservation.vue')
          },
          {
              path: 'classRecord',
              component: () => import('../view/student/ClassRecord.vue')
          },
          {
              path: 'recharge',
              component: () => import('../view/student/Recharge.vue')
          },
          {
              path: 'collect',
              component: () => import('../view/student/MyCollect.vue')
          },
          {
              path: 'setting',
              component: () => import('../view/student/student-setting.vue')
          }
      ]
    },

    // teacher
    {
      path: '/teacher',
      component: () => import('../view/teacher/Teacher.vue'),
      children: [
          {
              path: 'info',
              component: () => import('../view/teacher/info.vue')
          },
          {
              path: 'release',
              component: () => import('../view/teacher/ReleaseCourse.vue')
          },
          {
              path: 'notice',
              component: () => import('../view/teacher/MyNotice.vue')
          },
          {
              path: 'lesson',
              component: () => import('../view/teacher/MyLesson.vue')
          },
          {
              path: 'mystudent',
              component: () => import('../view/teacher/MyStudent.vue')
          },
          {
              path: 'setting',
              component: () => import('../view/teacher/teacher-setting.vue')
          },
      ]
    },

    // headmaster
    {
      path: '/headmaster',
      component: () => import('../view/headmaster/Headmaster.vue'),
      children: [
          {
            path: 'stuManagement',
            component: () => import('../view/headmaster/StudentManagement.vue')
          },
          {
              path: 'empManagement',
              component: () => import('../view/headmaster/EmployeeManagement.vue')
          },
          {
              path: 'stuNotification',
              component: () => import('../view/headmaster/StudentNotification.vue')
          },
          {
              path: 'setting',
              component: () => import('../view/headmaster/headmaster-setting.vue')
          },
      ]
    },

    // buju
    { path: '/bu', component: () => import('../view/test/test01.vue')},

    // { path: '/test1', component: () => import('../view/compoents/EmployeeManagement.vue')},

  ],
})