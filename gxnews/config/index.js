'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
let assetPath = "./";
let mode = process.env.BUILD_MODE;
if(mode == 1){
  assetPath = "//news.dtxww.cn/";
}
else if(mode == 2){
  assetPath = "//news.dtxww.cn/mini/";
}
else if(mode == 3){
  assetPath = "//news.dtxww.cn/content/";
}
else if(mode == 4){
  assetPath = "//news.dtxww.cn/mini/001/";
}
else if(mode == 5){
  assetPath = "//news.dtxww.cn/mini/002/";
}
else if(mode == 6){
  assetPath = "//news.dtxww.cn/mini/000/";
}
else if(mode == 7){
  assetPath = "//news.dtxww.cn/content/000/";
}

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/napi': {
        target:'https://www.dtw-tech.cn/api', // 你请求的第三方接口
        changeOrigin:true,
        pathRewrite:{ 
          '^/napi': ''  
        }
      },
      '/data':{
        target:'https://news.dtxww.cn/data',
        changeOrigin:true,
        pathRewrite:{
          '^/data': ''  
        }
      }
    },
    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    //正式
    assetsSubDirectory: 'static',
    assetsPublicPath:assetPath,
    /**
     * Source Maps
     */
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
