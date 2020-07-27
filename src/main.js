import Vue from 'vue'
import VueCookies from 'vue-cookies'
// import VueSession from 'vue-session'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueCookies)
// Vue.use(VueSession)


new Vue({
  render: h => h(App),
}).$mount('#app')
