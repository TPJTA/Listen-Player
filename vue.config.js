const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
      extensions: ['.vue', '.js'],
      mainFiles: ['index'],
    },
  },
  devServer: {
    port: 8080,
    host: 'localhost',
    https: false,
    open: true,
    proxy: {
      '/netServe': {
        target: 'https://interface.music.163.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/netServe': '',
        },
      },
      '/uQQ': {
        target: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/uQQ': '',
        },
        headers: { referer: 'https://y.qq.com/portal/player.html', host: 'u.y.qq.com' },
      },
      '/cQQ': {
        target: 'https://c.y.qq.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/cQQ': '',
        },
        headers: { referer: 'https://y.qq.com/portal/player.html', host: 'u.y.qq.com' },
      },
      '/yQQ': {
        target: 'https://y.qq.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/yQQ': '',
        },
        headers: { referer: 'https://y.qq.com/portal/player.html', host: 'u.y.qq.com' },
      },
    },
  },
};
