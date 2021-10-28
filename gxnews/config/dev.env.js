'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT:'"//localhost:8080"',
  PROXY_BASE:"'/napi'",
  //1首页 2 mini 3 content 4 mini2  5minib  6 minib测试  7 详情测试 8首页测试
  BUILD_MODE:"'3'"
})
