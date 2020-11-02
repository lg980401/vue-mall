/*
 *   配置编译环境和线上环境之间的切换
 *   baseUrl: 域名地址
 *   routerModel: 路由模式
 *
 *
 */

var baseUrl = "https://www.liulongbin.top:8888/api/private/v1/"; //测试

if (process.env.ENV_CONFIG === 'dev') {
  baseUrl = "https://www.liulongbin.top:8888/api/private/v1/"; //测试

} else if (process.env.ENV_CONFIG === 'test') {
  baseUrl = "http://#######.yfb.cn/api/"; //预发布

} else if (process.env.ENV_CONFIG === 'prod') {
  baseUrl = "http://#######.zs.cn/api/"; //正式

}

export {
  baseUrl
}
