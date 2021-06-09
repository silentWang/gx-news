'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT:'"//localhost:8080/napi"',
  DFTT_ADVER_URL:'"//open.xwdsp.com/phegda/advrest"'
})
