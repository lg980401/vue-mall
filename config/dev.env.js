'use strict'
// 该插件是用来合并对象，也就是配置文件用的
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// 将两个配置对象合并导出，NODE_ENV是一个环境变量，指定development环境
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

})
