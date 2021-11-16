'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'
//1首页 2 mini 3 content 4 mini2  5minib  6 minib测试  7 详情测试 8首页测试  
// 100 产品水印 100  100-mini 101-首页 102-详情页   105-mini测试  106-首页测试 107-详情页测试 
// 110 游戏盒子 110  110-mini 111-首页 112-详情页  115-mini测试  116-首页测试 117-详情页测试
// 120 2345 120 120-mini 121-首页 122-详情页  125-mini测试  126-首页测试 127-详情页测试
process.env.BUILD_MODE = 182

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
