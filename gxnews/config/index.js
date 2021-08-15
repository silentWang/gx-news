'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
let assetPath = "./";
if(process.env.BUILD_MODE == 1){
  assetPath = "//news.dtxww.cn/";
}
else if(process.env.BUILD_MODE == 2){
  assetPath = "//news.dtxww.cn/mini/";
}
else if(process.env.BUILD_MODE == 3){
  assetPath = "//news.dtxww.cn/content/";
}
else if(process.env.BUILD_MODE == 4){
  assetPath = "//news.dtxww.cn/mini/001/";
}

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/napi': {
        target:'https://data.sport-color.com/api', // 你请求的第三方接口
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
