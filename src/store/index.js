import Vue from "vue";
import Vuex from "vuex";
import login from './modules/login.js'
import layout from './modules/layout'
import users from './modules/user'


Vue.use(Vuex);
//模块化
const modules = {
  login,
  layout,
  users
}




export default new Vuex.Store({
  modules,


})
