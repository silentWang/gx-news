'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'
//1 mini 2 index 3 content 其他默认是index 
// 规则:>=100 每个渠道占10个id 前5个正式 后5个测试 0-mini 1-index 2-content ... test:5-mini 6-index 7-content
// 100渠道  100-mini 101-首页 102-详情页   105-mini测试  106-首页测试 107-详情页测试 
// 110渠道 110-mini 111-首页 112-详情页  115-mini测试  116-首页测试 117-详情页测试

process.env.BUILD_MODE = 100

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
