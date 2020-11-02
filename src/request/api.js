import axios from 'axios';

const RequestLogin = params => {
  return axios.post('login', params)
}
