// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'
import VeeValidate from 'vee-validate'


Vue.use(VeeValidate)
Vue.prototype.$http = axios
axios.defaults.withCredentials = true

Vue.config.productionTip = false

router.beforeEach((to, from, next)=>{
	store.commit('setIsUser',false)
	store.dispatch('isLogin').then((res)=>{
		if(store.getters.getCurrentUser.nickname==to.params.nickname){
			store.commit('setIsUser',true)
		}
	})
	next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
