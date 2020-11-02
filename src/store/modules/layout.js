import {
  ClearRequest
} from "../../request/http";
const state = {
  LoginInfo: {}
}
const mutations = {
  //保存登陆信息,写到vuex
  setLoginInfo(state, payload) {
    state.LoginInfo = payload

  }
}

const actions = {
  getAsideItem(state, payload) {
    return ClearRequest({
      url: 'menus',
      method: 'GET',
      qs: payload
    })
  }
}
const getters = {
  //加工获取登录名
  getUserName: state => {
    return state.LoginInfo.username;
  }
}

export default {
  actions,
  state,
  mutations,
  getters,

}
