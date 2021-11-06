'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

let urlPath = "";
let mode = process.env.BUILD_MODE;
if(mode == 1) urlPath = "";
else if(mode == 2) urlPath = "mini";
else if(mode == 3) urlPath = "content";
else if(mode == 4) urlPath = "mini/001";
else if(mode == 5) urlPath = "mini/002";
else if(mode == 6) urlPath = "mini/000";
else if(mode == 7) urlPath = "content/000";
else if(mode == 8) urlPath = "000";
else if(mode >= 100){
    let type = mode%10;
    let xpath = ~~((~~(mode/10))*10);
    xpath = type >= 5 ? "test" + xpath : xpath;
    if(type == 0) urlPath = `mini/${xpath}`;
    else if(type == 1) urlPath = `${xpath}`;
    else if(type == 2) urlPath = `content/${xpath}`;
    else if(type == 5) urlPath = `mini/${xpath}`;
    else if(type == 6) urlPath = `${xpath}`;
    else if(type == 7) urlPath = `content/${xpath}`;
}
let assetPath = !urlPath ? `//news.dtxww.cn/` : `//news.dtxww.cn/${urlPath}/`;
urlPath = !urlPath ? "dist" : urlPath;

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
    index: path.resolve(__dirname, '../'+urlPath+'/index.html'),
    // Paths
    assetsRoot: path.resolve(__dirname, '../'+urlPath),
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
