import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router.js'

Vue.prototype.$http = axios;

Vue.config.productionTip = false

export const eventBus = new Vue({
  methods:{
    changeModalState(){
      this.$emit('modalHide');
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
