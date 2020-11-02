import {
  ClearRequest
} from '../../request/http.js'


const actions = {
  login(store, payload) {
    return ClearRequest({
      url: 'login',
      method: 'POST',
      body: payload,
      auth: false,
      isLogin: true,

    })
  }
}

export default {
  actions
}
