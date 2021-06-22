'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT:'"//localhost:8080"',
  PROXY_BASE:"'/napi'",
  TEST_MODE:'"1"'
})
