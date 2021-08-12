module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'common': '@/common',
        'assets': '@/assets',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}