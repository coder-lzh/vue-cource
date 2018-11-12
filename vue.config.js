const path = require('path')
const resolve = dir => path.join(__dirname, dir)
// 环境控制
const BASE_URL = process.env.NODE_ENV === 'production' ? '/vue-cource' : '/'
module.exports = {
  // 保存时自动检查开关
  lintOnSave: false,
  baseUrl: BASE_URL,
  chainWebpack: config => {
    config.resolve.alias
      // @ 符号代表 src 目录，方便引入，例如引入 /src/api 直接 @/api 即可
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  // 打包时不生成 .map 文件
  productionSourceMap: false,
  // 开发跨域需求，任何位置请求都将请求
  devServer: {
    // proxy : 'http://localhost:10000'
  }

}
