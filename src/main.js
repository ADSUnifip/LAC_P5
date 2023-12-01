// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueTheMask from 'vue-the-mask'
import Toasted  from 'vue-toasted'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(VueTheMask)
Vue.use(Toasted, {duration:3000})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

