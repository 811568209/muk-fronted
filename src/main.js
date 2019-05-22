// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import'./assets/css/header.css'
import carousel from './components/common/carousel.vue'

Vue.prototype.carousel=carousel
Vue.config.productionTip = false

let  bus = new Vue();
Vue.prototype.bus=bus


Vue.use(VueResource)

Vue.http.interceptors.push(function(request, next) {//拦截器
// 跨域携带cookie
    request.credentials = true;
    next()
})

// Vue.use(vueAxios, axios)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
