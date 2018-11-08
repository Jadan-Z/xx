module.exports = {
  devServer: {
    port: 8086,
    // 代理地址
    proxy: 'http://192.168.0.101:8088'
  }
}