import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import axios from 'axios'
//配置请求根路径,default:默认
// axios.defaults.baseURL = 'http://www.liulongbin.top:3006'
// //把axios挂载到Vue.prototype上,供每个.vue组件的实例直接使用
// Vue.prototype.$http = axios




axios.defaults.baseURL='https://autumnfish.cn'
Vue.prototype.axios = axios
//今后在每个.vue组件中要发起请求,会直接调用this.$http.xxx(get或post)


import '@/assets/css/index.css'

// 引入字体图标库
import '@/assets/font-awesome-4.7.0/css/font-awesome.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
