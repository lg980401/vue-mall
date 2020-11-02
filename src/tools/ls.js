//导入第三方工具js数据处理 API
import isNil from "lodash/isNil";
//导入第三方工具cookies API
import Cookies from "js-cookie";

//定义保存变量类型
// Cookies LocalStorage Session
var SaveType = 'LocalStorage';

//定义存储用途类型
var LOGIN_INFO = 'loginInfo',
  LOGIN_KEYIN = 'loginKeyin',
  TICKER_SMS = 'tickerSMS',
  TICKER_EMAIL = 'ticker_EMAIL',
  TICKER_OPWD = 'ticker_OPWD'


//获取通道Token值
export function getAccessToken() {
  let loginInfo = getLoginInfo();
  return loginInfo;

}
//获取登陆信息
export function getLoginInfo() {
  return get(LOGIN_INFO);
}

//设置登录信息值(token等)
export function setLoginInfo(data) {
  return set(LOGIN_INFO, data);
}


export function getLoginKeyin() {

}

export function setLoginKeyin(data) {

}

export function getTickerSMS() {

}

export function setTickerSMS(data) {

}

export function getTickerEmail() {

}

export function setTickerEmail(data) {

}

export function getTickerOPWD() {

}

export function setTickerOPWD(data) {

}





//清除所有信息

export function clear() {
  setLoginInfo({});

}


//获取各类类型值
function get(id) {
  var data = {};
  if (SaveType == "LocalStorage") {
    data = localStorage.getItem(id);
  } else if (SaveType == "Cookies") {
    data = Cookies.get(id);
  } else if (SaveType == "Session") {
    data = sessionStorage.getItem(id);
  }

  if (isNil(data) || data === 'undefined') return false;
  return JSON.parse(data);
}


//设置各类型值 key->value
function set(id, data) {
  if (SaveType == "LocalStorage") {
    data = localStorage.setItem(id, JSON.stringify(data));
  } else if (SaveType == "Cookies") {
    data = Cookies.set(id, JSON.stringify(data));
  } else if (SaveType == "Session") {
    data = sessionStorage.setItem(id, JSON.stringify(data));
  }
  return true;
}
