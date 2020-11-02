import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from '@/store';
import {
  Message
} from 'element-ui'

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$message = Message
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
