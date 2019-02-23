import axios from 'axios'
import {Message} from "element-ui";

//axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = "/api"

//http request 拦截器
axios.interceptors.request.use(
  config => {
    // if (store.state.user.token) {
    //   config.headers.Authorization = `Bearer ${store.state.user.token}`
    // }
    return config
  }
)

axios.interceptors.response.use(
    response => {
        if (response.status >= 400) {
            // Message.error(`${response.status} ${response.statusText}`)
            Message.error(`${response.headers.message}`)
            // return
        }
        return response
    }
)

export default axios