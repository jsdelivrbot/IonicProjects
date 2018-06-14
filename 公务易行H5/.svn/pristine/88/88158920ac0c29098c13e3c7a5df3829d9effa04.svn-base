// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.prototype.url = 'url'
// Vue.prototype.url = 'https://x.tehang.com'
Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(VueResource)
Vue.use(VueRouter)
router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
