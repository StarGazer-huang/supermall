module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      extensions: [],
      alias: {
        'src' : '@',
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}
