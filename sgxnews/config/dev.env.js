'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT:'"//localhost:8080"',
  PROXY_BASE:"'/napi'",
  //1 mini 2 index 3 content 其他默认是index 
  // 规则:>=100 每个渠道占10个id 前5个正式 后5个测试 0-mini 1-index 2-content ... test:5-mini 6-index 7-content
  // 100渠道  100-mini 101-首页 102-详情页   105-mini测试  106-首页测试 107-详情页测试 
  // 110渠道 110-mini 111-首页 112-详情页  115-mini测试  116-首页测试 117-详情页测试
  BUILD_MODE:"'100'"
})
