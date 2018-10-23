import Vue from 'vue'
import Router from 'vue-router'

import L from '../components/Login'

Vue.use(Router)

export default new Router({
    routers: [
        //Login
        {path: '/', component: L},
    ]
})