import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import TelaInicial from '../components/TelaInicial.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/inicio',
      name: 'TelaInicial',
      component: TelaInicial
    },
    {
      path: '*',
      name: 'Error404',
      component: Error
    }
    
  ]
})
