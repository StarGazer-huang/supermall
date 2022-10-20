import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mitt from "mitt";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  mitt
}).$mount('#app')
