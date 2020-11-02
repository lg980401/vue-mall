import {
  ClearRequest
} from "@/request/http";
const state = {}
const actions = {
  getUserList(state, payload) {
    return ClearRequest({
      url: 'users',
      method: 'GET',
      qs: payload

    })
  }
}

export default {
  actions
}
