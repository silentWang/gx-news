'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT:'"//localhost:8080"',
  PROXY_BASE:"'/napi'",
  //1首页 2 mini 3 content 4 mini2  5minib  6 minib测试  7 详情测试 8首页测试  
  // 100 产品水印 100  100-mini 101-首页 102-详情页   105-mini测试  106-首页测试 107-详情页测试 
  // 110 游戏盒子 110  110-mini 111-首页 112-详情页  115-mini测试  116-首页测试 117-详情页测试
  // 120 2345 120 120-mini 121-首页 122-详情页  125-mini测试  126-首页测试 127-详情页测试
  BUILD_MODE:"'182'"
})
